# Agent Girl: Comprehensive Capabilities Document

**Version:** 7.2.0+ (with Copywriting Extensions)  
**Last Updated:** November 2025  
**Author:** ClinWell Development Team

---

## 🎯 Executive Summary

Agent Girl is a **production-grade AI development environment** powered by Claude Agent SDK, designed for developers, founders, and power users who need sophisticated AI assistance with **full system access**. Unlike web-based AI tools, Agent Girl runs locally, provides persistent context, and can execute complex multi-agent workflows with enterprise-grade reliability.

**What Makes Agent Girl Unique:**
- ✅ **Local-first architecture** - All data stays on your machine
- ✅ **Full file system access** - Read, write, edit any file
- ✅ **Specialized sub-agents** - 27+ expert agents for specific tasks
- ✅ **Multi-mode operation** - 6 specialized modes with optimized prompts
- ✅ **Context-aware frameworks** - Load massive knowledge bases on-demand
- ✅ **Real-time streaming** - See AI thinking and tool use live
- ✅ **Session persistence** - Never lose conversation history
- ✅ **MCP integration** - Extensible via Model Context Protocol

---

## 🏗️ Core Architecture

### Technology Stack

**Frontend:**
- React 18 + TypeScript (strict typing)
- Radix UI (accessible components)
- Tailwind CSS 4 (utility-first styling)
- Framer Motion (smooth animations)
- React Virtual (performance optimization)

**Backend:**
- Bun runtime (ultra-fast JavaScript)
- Claude Agent SDK v0.1.37
- SQLite (persistent storage)
- WebSocket (real-time streaming)
- MCP servers (extensibility)

**Infrastructure:**
- Session-isolated workspaces
- File-based prompt loading
- Context caching system
- Multi-provider support (Anthropic, Z.AI, custom)

### Key Architectural Patterns

1. **Context-Based Agent Loading** - Large prompts (50KB+) loaded on-demand to avoid memory limits
2. **Session Isolation** - Each chat has dedicated workspace preventing file conflicts
3. **Streaming Architecture** - Real-time WebSocket updates for responsive UX
4. **Tool Composability** - Agents can use any combination of 10+ tools
5. **Framework Orchestration** - Master agents coordinate specialist sub-agents

---

## 🤖 27+ Specialized Agents

Agent Girl includes a comprehensive registry of expert agents, each optimized for specific tasks.

### 🏗️ Architecture & System Design (3 Agents)

#### `architect`
**Purpose:** Design scalable systems and choose tech stacks  
**Capabilities:**
- Design microservices vs monolith architectures
- Select appropriate frameworks and technologies
- Create architecture diagrams (Mermaid, text-based)
- Identify bottlenecks and failure points
- Plan implementation roadmaps

**Use Cases:**
- Designing a new SaaS application
- Migrating monolith to microservices
- Evaluating technology stack options

---

#### `api-designer`
**Purpose:** RESTful/GraphQL API design and OpenAPI specs  
**Capabilities:**
- Design RESTful and GraphQL APIs
- Generate OpenAPI 3.0+ specifications
- Plan authentication flows (OAuth2, JWT, API keys)
- Define rate limiting and versioning strategies
- Create endpoint documentation

**Use Cases:**
- Building a REST API for mobile app
- Designing GraphQL schema
- Creating API documentation

---

#### `frontend-architect`
**Purpose:** React/Vue/Angular component design and state management  
**Capabilities:**
- Design component hierarchies
- Choose state management (Redux, Zustand, Context)
- Plan routing and navigation
- Optimize bundle size and performance
- Recommend modern patterns (RSC, Suspense)

**Use Cases:**
- Planning a React application structure
- Refactoring state management
- Optimizing frontend performance

---

### 💻 Development Engineering (11 Agents)

#### `code-reviewer`
**Purpose:** Identify bugs, security issues, and code quality problems  
**Capabilities:**
- Detect OWASP Top 10 vulnerabilities
- Find performance bottlenecks
- Check maintainability and readability
- Suggest concrete improvements
- Prioritize findings (Critical/High/Medium/Low)

**Tools:** Read, Grep, Glob

---

#### `debugger`
**Purpose:** Systematically track down and fix bugs  
**Capabilities:**
- Analyze stack traces
- Create minimal reproduction cases
- Test hypotheses methodically
- Verify fixes don't introduce regressions
- Document root cause analysis

**Use Cases:**
- Tracking down intermittent bugs
- Analyzing production errors
- Fixing race conditions

---

#### `test-writer`
**Purpose:** Write comprehensive test suites  
**Capabilities:**
- Write unit tests (AAA pattern)
- Create integration tests
- Mock dependencies appropriately
- Cover edge cases and error conditions
- Ensure tests are fast and deterministic

**Frameworks:** Jest, Vitest, Pytest, Go testing, etc.

---

#### `documenter`
**Purpose:** Generate clear documentation and examples  
**Capabilities:**
- Write API documentation
- Create README files
- Generate code examples
- Document architecture decisions
- Write inline code comments

**Use Cases:**
- Documenting new features
- Creating onboarding guides
- Writing API reference docs

---

#### `security-auditor`
**Purpose:** Security vulnerability assessment  
**Capabilities:**
- Identify injection vulnerabilities
- Check authentication/authorization flaws
- Review encryption implementations
- Assess API security
- Generate security reports

**Standards:** OWASP Top 10, CWE Top 25

---

#### `performance-optimizer`
**Purpose:** Identify and fix performance issues  
**Capabilities:**
- Profile code execution
- Identify N+1 queries
- Optimize database queries
- Reduce bundle sizes
- Implement caching strategies

---

#### `refactoring-specialist`
**Purpose:** Improve code quality and maintainability  
**Capabilities:**
- Extract functions and modules
- Remove code duplication
- Simplify complex logic
- Improve naming conventions
- Apply SOLID principles

**Patterns:** Factory, Strategy, Observer, Builder, etc.

---

#### `database-designer`
**Purpose:** Design database schemas and migrations  
**Capabilities:**
- Design normalized schemas
- Create ORMs and migrations
- Optimize query performance
- Design indexes
- Plan sharding strategies

**Databases:** PostgreSQL, MySQL, MongoDB, etc.

---

#### `devops-specialist`
**Purpose:** CI/CD pipelines and infrastructure  
**Capabilities:**
- Design Docker containers
- Write CI/CD pipelines
- Configure Kubernetes
- Set up monitoring
- Implement IaC (Terraform, CloudFormation)

---

#### `git-workflow-specialist`
**Purpose:** Git operations and branching strategies  
**Capabilities:**
- Resolve merge conflicts
- Design branching strategies
- Write .gitignore rules
- Optimize repository structure
- Create Git hooks

---

#### `dependency-manager`
**Purpose:** Manage and update dependencies  
**Capabilities:**
- Audit dependency security
- Update package versions
- Resolve version conflicts
- Optimize dependency trees
- Migrate deprecated packages

---

### 🎨 UI/UX & Design Systems (6 Agents)

#### `ui-component-builder`
**Purpose:** Build production-ready UI components  
**Capabilities:**
- Create accessible components
- Implement responsive designs
- Build reusable patterns
- Follow design system guidelines
- Optimize for performance

**Frameworks:** React, Vue, Svelte, Web Components

---

#### `design-system-architect`
**Purpose:** Design and implement design systems  
**Capabilities:**
- Create component libraries
- Define design tokens
- Establish theming system
- Document design patterns
- Implement accessibility standards

---

#### `accessibility-specialist`
**Purpose:** Ensure WCAG compliance  
**Capabilities:**
- Audit accessibility issues
- Implement ARIA patterns
- Ensure keyboard navigation
- Fix color contrast issues
- Create screen reader optimizations

**Standards:** WCAG 2.1 AA/AAA

---

#### `typography-specialist`
**Purpose:** Professional font systems  
**Capabilities:**
- Configure font loading
- Set typography scales
- Implement fluid typography
- Ensure responsive text
- Create font fallback stacks

---

#### `color-specialist`
**Purpose:** Color systems and theming  
**Capabilities:**
- Create color palettes
- Implement CSS variables
- Ensure WCAG contrast compliance
- Build dark/light themes
- Document color usage

---

#### `animation-specialist`
**Purpose:** Smooth, performant animations  
**Capabilities:**
- Create micro-interactions
- Implement entrance/exit animations
- Use hardware-accelerated properties
- Respect prefers-reduced-motion
- Optimize for 60fps

---

### ✍️ Copywriting & Content (1 Master Agent + 14 Frameworks)

#### `copywriting` (NEW!)
**Purpose:** Master copywriting orchestrator with 14 specialized frameworks  
**Capabilities:**
- Professional social media copy
- Conversion-focused landing pages
- Video scripts (TikTok, Reels, YouTube)
- Headlines and hooks (9 psychological triggers)
- Quality scoring (100-point system)

**Master Copywriters:**
- Sabri Suby (leverage positioning)
- Dan Kennedy (deadline scarcity)
- Gary Halbert (story-based selling)
- Chief Neefe (contrast loops)

**14 Specialized Frameworks:**

1. **copy-commander** - Master orchestrator, routes requests
2. **social-media-sub-commander** - Instagram, Facebook, Twitter/X, LinkedIn, TikTok
3. **landing-page-sub-commander** - Sales pages, product pages, web copy
4. **video-script-sub-commander** - YouTube, VSL, TikTok, Reels
5. **research-agent** - Web research, swipe files, validation
6. **headlines-hooks-specialist** - Psychology-based hooks
7. **swipe-file-agent** - Curated examples from real campaigns
8. **social-copywriter** - 3-5 variations using different frameworks
9. **landing-copywriter** - Conversion-focused web copy
10. **video-copywriter** - Short-form video scripts
11. **tone-voice-reviewer** - Brand voice consistency
12. **psychology-reviewer** - Trigger validation
13. **audience-fit-reviewer** - Persona alignment
14. **entertainment-reviewer** - Engagement optimization

**Knowledge Base:**
- Copywriting frameworks (PAS, AIDA, FAB, BAB, 4Us, 4Ps, Slippery Slide)
- 9 psychological triggers with intensity scales
- 7-point quality evaluation system
- Master copywriter technique playbooks

**Quality Standards:**
- 100-point scoring system
- 80+ point acceptance threshold
- No AI-sounding language
- Authentic conversational tone
- Specific examples and numbers

---

### 🔧 Specialized Utilities (6 Agents)

Additional specialized agents available for specific tasks:
- Content writer
- Technical writer  
- Data analyst
- ML engineer
- SEO specialist
- Email marketer

---

## 🎮 6 Specialized Modes

Agent Girl's mode system provides optimized prompts and workflows for common use cases.

### Mode 1: **General**
**Description:** Everyday conversation & research  
**Best For:**
- General questions
- Quick research tasks
- Casual conversations
- File organization
- Simple automations

**Tools Available:** All tools (Read, Write, Edit, Bash, Grep, Glob, WebSearch, etc.)

---

### Mode 2: **Coder**
**Description:** Software development & debugging  
**Best For:**
- Writing production code
- Debugging complex issues
- Refactoring codebases
- Setting up projects
- Code reviews

**Optimizations:**
- Follows existing code patterns
- Adheres to project conventions
- Validates syntax before responding
- Runs tests after changes

---

### Mode 3: **Intense Research**
**Description:** 5 agents, multi-angle deep research  
**Best For:**
- Competitive analysis
- Market research
- Technical deep-dives
- Literature reviews
- Multi-source validation

**Architecture:**
- Spawns 5 research agents in parallel
- Each agent takes different angle
- Results synthesized by coordinator
- Source validation and fact-checking

---

### Mode 4: **Spark**
**Description:** Interactive brainstorming with research  
**Best For:**
- Ideation sessions
- Product planning
- Feature design
- Creative problem-solving
- Strategic planning

**Characteristics:**
- Asks clarifying questions
- Explores multiple angles
- Backs ideas with research
- Iterative refinement

---

### Mode 5: **Copywriting** (NEW!)
**Description:** 14 frameworks from master copywriters  
**Best For:**
- Social media posts
- Landing page copy
- Video scripts
- Email campaigns
- Ad copy

**Workflow:**
1. Analyzes request and selects framework
2. Reads specialist prompt files as context
3. Applies psychological triggers
4. Generates 3-5 variations
5. Scores using 100-point system
6. Delivers with rationale

**Frameworks Available:**
- PAS (Problem-Agitate-Solution)
- AIDA (Attention-Interest-Desire-Action)
- FAB (Features-Advantages-Benefits)
- BAB (Before-After-Bridge)
- 4Us (Useful, Urgent, Unique, Ultra-specific)
- 4Ps (Promise, Picture, Proof, Push)
- Slippery Slide

---

### Mode 6: **Build**
**Description:** Create projects with guided setup  
**Best For:**
- Starting new projects
- Scaffolding applications
- Setting up boilerplate
- Configuring tooling

**Features:**
- Project type selection (React, Next.js, Express, etc.)
- Dependency management
- Configuration wizard
- Best practices applied

---

## 🛠️ 10+ Powerful Tools

Agents have access to a comprehensive toolkit for interacting with your system.

### File Operations

#### `Read` - Read file contents
**Capabilities:**
- Read any file on your system
- Support for text files, images, PDFs
- Line range selection for large files
- Batch reading multiple files

**Example Use Cases:**
- Reading configuration files
- Analyzing code structure
- Reviewing documentation

---

#### `Write` - Create new files
**Capabilities:**
- Create files anywhere
- Set file permissions
- Create directory structure
- Write binary files

---

#### `Edit` - Modify existing files
**Capabilities:**
- Find and replace
- Line-based edits
- Multi-file edits in single operation
- Preserve formatting and indentation

---

### Code Search

#### `Grep` - Fast text search
**Capabilities:**
- Regular expression support
- Multi-file search
- Case-sensitive/insensitive
- Line number reporting

---

#### `Glob` - Find files by pattern
**Capabilities:**
- Wildcard patterns (`*.js`, `**/*.ts`)
- Recursive directory search
- Depth limiting
- Exclude patterns

---

### Execution

#### `Bash` - Run shell commands
**Capabilities:**
- Execute any shell command
- Stream output in real-time
- Set working directory
- Environment variable support
- Timeout protection

**Safety:** Non-interactive commands only

---

#### `Task` - Spawn sub-agents
**Capabilities:**
- Spawn specialized agents
- Pass context and instructions
- Monitor sub-agent progress
- Aggregate results

**Use Cases:**
- Parallel research tasks
- Specialized code generation
- Multi-perspective analysis

---

### Web Integration

#### `WebSearch` - Search the web
**Capabilities:**
- Google-like search
- Result summarization
- Source extraction
- Real-time information

**Provider:** Available with Z.AI and MCP servers

---

#### `WebFetch` - Fetch web pages
**Capabilities:**
- Retrieve HTML content
- Parse structured data
- API calls
- Web scraping

---

### Specialized Tools

Additional tools available via MCP:
- **Browser automation** (Playwright MCP)
- **Database access** (SQL MCP)
- **Cloud APIs** (AWS, Azure, GCP MCPs)
- **Version control** (Git MCP)

---

## 💡 Powerful Use Cases

### 1. Full-Stack Development

**Scenario:** Building a SaaS application from scratch

**Workflow:**
1. **Planning** (Spark mode)
   - Brainstorm features
   - Define MVP scope
   - Plan architecture

2. **Architecture** (`architect` agent)
   - Design system architecture
   - Choose tech stack
   - Plan database schema

3. **API Design** (`api-designer` agent)
   - Create OpenAPI spec
   - Define endpoints
   - Design authentication

4. **Frontend** (`frontend-architect` agent)
   - Design component structure
   - Choose state management
   - Plan routing

5. **Implementation** (Coder mode)
   - Generate boilerplate
   - Implement features
   - Write tests

6. **Quality Assurance**
   - `code-reviewer` - Code review
   - `test-writer` - Test coverage
   - `security-auditor` - Security scan

7. **Documentation** (`documenter` agent)
   - API documentation
   - README
   - Setup guides

**Result:** Production-ready application in hours instead of days

---

### 2. Marketing Campaign Creation

**Scenario:** Launch a new product with complete marketing assets

**Workflow:**
1. **Research** (Intense Research mode)
   - Competitor analysis
   - Target audience research
   - Market positioning

2. **Copywriting** (Copywriting mode)
   - Social media posts (Instagram, LinkedIn, Twitter)
   - Landing page copy
   - Email sequences
   - Video scripts
   - Ad headlines

3. **Content Strategy**
   - `copywriting` - Generate 3-5 variations per asset
   - Quality score each variation
   - A/B test recommendations

4. **Implementation**
   - Write copy to files
   - Organize by channel
   - Schedule content calendar

**Result:** Complete marketing campaign with high-quality, conversion-focused copy

---

### 3. Code Migration & Refactoring

**Scenario:** Migrate legacy codebase to modern stack

**Workflow:**
1. **Analysis** (`code-reviewer` agent)
   - Audit existing code
   - Identify technical debt
   - Prioritize changes

2. **Planning** (`architect` agent)
   - Design target architecture
   - Plan migration path
   - Identify risks

3. **Refactoring** (`refactoring-specialist` agent)
   - Extract modules
   - Remove duplication
   - Improve structure

4. **Testing** (`test-writer` agent)
   - Write comprehensive tests
   - Ensure coverage
   - Verify behavior

5. **Migration** (Coder mode)
   - Incremental migration
   - Parallel old/new systems
   - Gradual cutover

**Result:** Modernized codebase with zero downtime

---

### 4. Research & Analysis

**Scenario:** Competitive analysis for product strategy

**Workflow:**
1. **Deep Research** (Intense Research mode)
   - 5 agents analyze competitors
   - Each takes different angle:
     - Product features
     - Pricing strategy
     - Marketing approach
     - Technical stack
     - Customer reviews

2. **Synthesis**
   - Coordinator aggregates findings
   - Identifies patterns
   - Generates insights

3. **Documentation** (`documenter` agent)
   - Executive summary
   - Detailed report
   - Competitive matrix
   - Strategic recommendations

**Result:** Comprehensive competitive analysis with actionable insights

---

### 5. Design System Implementation

**Scenario:** Build a production-ready design system

**Workflow:**
1. **Architecture** (`design-system-architect` agent)
   - Define token structure
   - Plan component hierarchy
   - Choose technology

2. **Typography** (`typography-specialist` agent)
   - Configure font system
   - Set type scale
   - Implement responsive typography

3. **Colors** (`color-specialist` agent)
   - Create color palette
   - Ensure accessibility
   - Build theming system

4. **Animation** (`animation-specialist` agent)
   - Design micro-interactions
   - Implement transitions
   - Optimize performance

5. **Components** (`ui-component-builder` agent)
   - Build component library
   - Ensure accessibility
   - Write Storybook stories

6. **Documentation** (`documenter` agent)
   - Component documentation
   - Usage guidelines
   - Code examples

**Result:** Complete design system with documentation

---

## 🚀 Advanced Capabilities

### Context-Based Framework Loading

**Problem:** Large prompts (50KB+) exceed command-line argument limits

**Solution:** Agent Girl loads massive knowledge bases on-demand

**How It Works:**
1. User selects Copywriting mode
2. Agent uses Read tool to load 50KB+ prompt files
3. Applies frameworks as "thinking context"
4. Generates output following master copywriter techniques

**Benefits:**
- No size limits on agent prompts
- Can load entire books as context
- Dynamic framework selection
- Zero subprocess overhead

**Example:**
```
User: "Write LinkedIn post for SaaS founders"
Agent: 
  1. Reads copy-commander/prompt.md (32KB)
  2. Reads social-media-sub-commander/prompt.md (45KB)  
  3. Reads psychological-frameworks.md (25KB)
  Total context: 102KB loaded seamlessly
  4. Generates conversion-focused post
  5. Scores using 100-point system
```

---

### Multi-Agent Orchestration

**Capability:** Coordinate multiple specialized agents

**Pattern:**
1. Master agent receives complex task
2. Breaks down into subtasks
3. Spawns specialist agents using Task tool
4. Each specialist works independently
5. Master aggregates results

**Example: Building a Feature**
```
Master (Coder mode)
├── architect - Design architecture
├── api-designer - Design API
├── frontend-architect - Design components
├── test-writer - Write test suite
└── documenter - Generate docs
```

**Result:** Parallel execution, faster completion

---

### Session Isolation

**Capability:** Each chat has dedicated workspace

**Benefits:**
- No file conflicts
- Clean working directory
- Easy cleanup
- Project-specific context

**Structure:**
```
~/Documents/agent-girl-app/
├── chat-abc123/
│   ├── src/
│   ├── tests/
│   └── docs/
└── chat-def456/
    ├── analysis/
    └── reports/
```

---

### Real-Time Streaming

**Capability:** See AI thinking and tool use live

**Features:**
- Token-by-token response streaming
- Tool use visualization
- Nested sub-agent display
- Progress indicators

**UX Benefits:**
- Immediate feedback
- Transparency
- Ability to stop mid-execution
- Understanding of AI reasoning

---

### Multi-Provider Support

**Capability:** Switch between AI providers

**Supported Providers:**
1. **Anthropic** - Claude Sonnet 4.5 (primary)
2. **Z.AI** - GLM 4.6 with web search
3. **Custom** - Any OpenAI-compatible API

**Use Cases:**
- Cost optimization
- Feature access (web search)
- Fallback providers
- Model comparison

---

## 📊 Real-World Examples

### Example 1: ClinWell EMR Development

**Context:** Building a medical practice management system

**Agents Used:**
- `architect` - Designed HIPAA-compliant architecture
- `api-designer` - Created healthcare API spec
- `frontend-architect` - Designed patient portal UI
- `security-auditor` - Ensured compliance
- `test-writer` - Comprehensive test coverage
- `documenter` - Technical documentation

**Outcome:** Production-ready EMR in 3 weeks

---

### Example 2: Product Launch Campaign

**Context:** Launching AI productivity tool

**Agents Used:**
- `copywriting` mode (Intense Research + Copywriting)
- Generated 50+ marketing assets
- 5 variations per asset
- Quality scored each variation

**Deliverables:**
- LinkedIn posts (professional tone)
- Twitter threads (conversational)
- Landing page copy (conversion-focused)
- Email sequences (nurture flow)
- Video scripts (TikTok, YouTube)

**Outcome:** Complete campaign in 4 hours

---

### Example 3: Legacy Code Migration

**Context:** Migrate jQuery app to React

**Agents Used:**
- `code-reviewer` - Audit jQuery codebase
- `refactoring-specialist` - Extract reusable logic
- `frontend-architect` - Design React structure
- Coder mode - Implement migration
- `test-writer` - Ensure functionality preserved

**Outcome:** Zero-downtime migration, improved performance

---

## 🎁 Unique Differentiators

### vs ChatGPT / Claude Web

| Feature | Agent Girl | Web AI Tools |
|---------|-----------|--------------|
| **File System Access** | ✅ Full access | ❌ Copy-paste only |
| **Persistent Context** | ✅ SQLite storage | ❌ Lost on refresh |
| **Sub-Agent Spawning** | ✅ 27+ specialists | ❌ Single model |
| **Specialized Modes** | ✅ 6 optimized modes | ❌ Generic responses |
| **Privacy** | ✅ Local data | ⚠️ Cloud storage |
| **Tool Execution** | ✅ Bash, file ops | ❌ No system access |
| **Custom Knowledge** | ✅ Load 100KB+ contexts | ❌ Limited context |
| **Real-Time Streaming** | ✅ WebSocket | ⚠️ Polling |

---

### vs Cursor / GitHub Copilot

| Feature | Agent Girl | Code Assistants |
|---------|-----------|-----------------|
| **Multi-Domain** | ✅ Code + Copy + Research | ❌ Code only |
| **Orchestration** | ✅ Multi-agent workflows | ❌ Single assistant |
| **File Operations** | ✅ Read/write/edit any file | ⚠️ Current file only |
| **Research** | ✅ Web search + analysis | ❌ No web access |
| **Copywriting** | ✅ 14 frameworks | ❌ Not supported |
| **Architecture** | ✅ System design agents | ❌ Code completion only |

---

## 🔮 What You Can Build

With Agent Girl's capabilities, you can:

### 🏢 Business Applications
- Complete SaaS applications (frontend + backend)
- Internal tools and dashboards
- Admin panels
- CRM systems
- Analytics platforms

### 📱 Mobile & Web
- Progressive web apps
- Mobile-responsive websites
- Chrome extensions
- Electron desktop apps
- React Native apps

### 🤖 AI & Automation
- Chatbots and conversational AI
- Data processing pipelines
- Web scrapers
- Email automation
- Task schedulers

### 🎨 Content & Marketing
- Marketing campaigns (complete)
- Landing pages (copy + design)
- Social media content (all platforms)
- Video scripts
- Email sequences
- Blog posts
- Documentation sites

### 🔧 Developer Tools
- CLI applications
- Build scripts
- Testing frameworks
- Code generators
- Deployment automation
- Monitoring tools

### 📊 Data & Analytics
- Data visualization dashboards
- ETL pipelines
- Report generators
- Analytics scripts
- Database migrations

---

## 📈 Performance & Scale

### Speed Benchmarks

**Typical Response Times:**
- Simple query: 2-5 seconds
- Code generation: 10-30 seconds
- Multi-file refactor: 30-60 seconds
- Complex research: 1-3 minutes
- Full feature implementation: 5-15 minutes

**Context Efficiency:**
- Copywriting mode: 7-15% context (13K-30K tokens)
- Coder mode: 10-20% context
- Intense Research: 20-40% context (parallel agents)

### Scalability

**Tested Scenarios:**
- ✅ 10,000+ lines of code generated
- ✅ 100+ file operations in single task
- ✅ 50+ marketing assets in single session
- ✅ 5 parallel research agents
- ✅ 2-hour continuous coding session

---

## 🎓 Best Practices

### 1. Choose the Right Mode
- **General** - Quick questions, file organization
- **Coder** - All software development tasks
- **Intense Research** - When you need thorough analysis
- **Spark** - Brainstorming and ideation
- **Copywriting** - All marketing and content creation
- **Build** - Starting new projects

### 2. Use Specialized Agents
- Don't use General mode for code review
- Spawn `code-reviewer` agent explicitly
- Let orchestrator delegate to specialists
- Trust the framework selection

### 3. Provide Context
- Describe the project
- Share relevant files
- Explain constraints
- Specify output format
- Give examples if available

### 4. Iterate and Refine
- Start with rough request
- Review output
- Ask for specific improvements
- Build incrementally

### 5. Leverage Session Isolation
- Create dedicated chat for each project
- Set working directory appropriately
- Keep related work in same session
- Archive completed sessions

---

## 🚀 Getting Started

### Installation
```bash
# One-line install (macOS/Linux/Windows)
curl -fsSL https://raw.githubusercontent.com/KenKaiii/agent-girl/master/install.sh | bash
```

### First Steps
1. Configure API key in `.env`
2. Launch Agent Girl (`agent-girl` command or double-click app)
3. Create new chat
4. Select mode based on task
5. Start building!

### Quick Wins

**Try These First:**
1. "Write me a README for a React project" (General mode)
2. "Review this code for security issues" (Coder mode + `code-reviewer`)
3. "Research the best React state management solutions" (Intense Research)
4. "Write a LinkedIn post about AI productivity" (Copywriting mode)
5. "Help me brainstorm features for a task management app" (Spark mode)

---

## 📞 Support & Community

- **Documentation:** Full README at GitHub
- **Issues:** [GitHub Issues](https://github.com/KenKaiii/agent-girl/issues)
- **Discussions:** [GitHub Discussions](https://github.com/KenKaiii/agent-girl/discussions)
- **YouTube:** [@kenkaidoesai](https://www.youtube.com/@kenkaidoesai)
- **Community:** [Skool](https://www.skool.com/kenkai)

---

## 🎯 Conclusion

Agent Girl is not just a chatbot—it's a **complete AI development environment** with:

✅ **27+ specialized agents** for every domain  
✅ **6 optimized modes** for common workflows  
✅ **14 copywriting frameworks** from master copywriters  
✅ **Context-aware architecture** supporting 100KB+ knowledge bases  
✅ **Full system access** with 10+ powerful tools  
✅ **Multi-agent orchestration** for complex tasks  
✅ **Local-first privacy** with persistent sessions  

**What You Can Build:** Literally anything—from complete SaaS applications to comprehensive marketing campaigns, from design systems to data pipelines.

**The Difference:** Agent Girl doesn't just answer questions. It **builds, analyzes, writes, designs, tests, documents, and deploys**—all from a single interface.

**Ready to 10x your productivity?** Install Agent Girl and start building today.

---

**Version:** 7.2.0+ (November 2025)  
**License:** AGPL-3.0  
**Created by:** KenKai  
**Extended by:** ClinWell Development Team

*This capabilities document will be updated as new agents, modes, and features are added.*
