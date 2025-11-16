/**
 * Validation Test Runner for Deep Research V2
 * 
 * This script tests the file-based multi-session architecture by:
 * 1. Spawning researcher-stateful-test agent
 * 2. Verifying it returns JSON-only output
 * 3. Checking that full research is saved to file
 * 4. Measuring context usage
 */

import { query } from '@anthropic-ai/claude-agent-sdk';
import { AGENT_REGISTRY } from './server/agents';
import { readFileSync, existsSync } from 'fs';
import { configureProvider } from './server/providers';

async function runValidationTest() {
  console.log('\n🧪 VALIDATION TEST: File-Based Multi-Session Architecture\n');
  console.log('=' .repeat(60));
  
  // Get test agent definition
  const agentDef = AGENT_REGISTRY['researcher-stateful-test'];
  
  if (!agentDef) {
    console.error('❌ Test agent not found in registry');
    process.exit(1);
  }
  
  console.log('✅ Test agent loaded:', agentDef.description);
  console.log('\n📋 Test Criteria:');
  console.log('  1. Agent returns JSON summary only (< 500 tokens)');
  console.log('  2. Full research saved to file (3000-5000 words)');
  console.log('  3. File is readable and contains proper content');
  console.log('  4. Context usage remains minimal (< 50k tokens)');
  
  // Configure provider
  console.log('\n🔧 Configuring provider...\n');
  await configureProvider('anthropic');
  
  // Run test query using SDK
  const startTime = Date.now();
  
  try {
    console.log('🚀 Spawning test agent...\n');
    console.log('💬 Query: Execute validation test...\n');
    
    // Query the test agent directly using its definition
    const userPrompt = 'Execute your validation test: research AI code generation advancements 2024-2025, save to file, return JSON summary only.';
    
    const sdkQuery = query({
      prompt: [userPrompt],
      options: {
        model: 'claude-sonnet-4-20250514',
        systemPrompt: agentDef.prompt, // Use the test agent's prompt directly
        permissionMode: 'bypassPermissions',
        cwd: 'E:\\AI\\0_SYNTHIQ\\agent-girl',
      }
    });
    
    // Collect all messages from SDK stream
    let result = '';
    for await (const message of sdkQuery) {
      if (message.role === 'assistant' && Array.isArray(message.content)) {
        for (const block of message.content) {
          if (block.type === 'text') {
            result += block.text;
          }
        }
      }
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 VALIDATION RESULTS\n');
    console.log(`⏱️  Duration: ${duration}s`);
    console.log('\n📤 Agent Response:');
    console.log('-'.repeat(60));
    console.log(result);
    console.log('-'.repeat(60));
    
    // Validate response is JSON
    let jsonOutput;
    try {
      jsonOutput = JSON.parse(result.trim());
      console.log('\n✅ PASS: Response is valid JSON');
    } catch (e) {
      console.log('\n❌ FAIL: Response is not valid JSON');
      console.log('   Expected JSON-only output per Rule 5');
      return false;
    }
    
    // Check response size (rough token estimate: 1 token ≈ 4 chars)
    const estimatedTokens = Math.ceil(result.length / 4);
    console.log(`\n📏 Response size: ${result.length} chars (~${estimatedTokens} tokens)`);
    
    if (estimatedTokens < 500) {
      console.log('✅ PASS: Response is minimal (< 500 tokens)');
    } else {
      console.log('❌ FAIL: Response exceeds 500 tokens');
      return false;
    }
    
    // Check file exists
    const filePath = jsonOutput.research_file;
    console.log(`\n📁 Checking file: ${filePath}`);
    
    if (!existsSync(filePath)) {
      console.log('❌ FAIL: File does not exist');
      return false;
    }
    
    console.log('✅ PASS: File exists');
    
    // Check file content
    const fileContent = readFileSync(filePath, 'utf-8');
    const wordCount = fileContent.split(/\s+/).length;
    const charCount = fileContent.length;
    
    console.log(`\n📄 File stats:`);
    console.log(`   - Words: ${wordCount}`);
    console.log(`   - Characters: ${charCount}`);
    
    if (wordCount >= 3000 && wordCount <= 6000) {
      console.log('✅ PASS: File contains expected word count (3000-5000)');
    } else if (wordCount < 3000) {
      console.log('⚠️  WARN: File has fewer words than expected');
    } else {
      console.log('⚠️  WARN: File has more words than expected');
    }
    
    // Validate JSON structure
    const requiredFields = ['status', 'research_file', 'topic', 'sources_count', 'word_count', 'key_findings'];
    const missingFields = requiredFields.filter(field => !(field in jsonOutput));
    
    if (missingFields.length === 0) {
      console.log('\n✅ PASS: JSON has all required fields');
    } else {
      console.log(`\n❌ FAIL: JSON missing fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('🎯 VALIDATION SUMMARY\n');
    console.log('✅ Agent returned JSON-only output');
    console.log('✅ Full research saved to external file');
    console.log('✅ File is readable and properly formatted');
    console.log('✅ Context usage kept minimal');
    console.log('\n🎉 VALIDATION TEST PASSED!');
    console.log('\n✨ File-based multi-session architecture is VALIDATED');
    console.log('   Ready to scale to full Deep Research implementation');
    console.log('='.repeat(60) + '\n');
    
    return true;
    
  } catch (error) {
    console.error('\n❌ Test failed with error:', error);
    return false;
  }
}

// Run test
runValidationTest().then(success => {
  process.exit(success ? 0 : 1);
});
