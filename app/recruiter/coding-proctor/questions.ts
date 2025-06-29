export interface Question {
  id: number;
  type: 'DSA' | 'System Design' | 'Reverse Engineering';
  difficulty: 'Medium' | 'Hard';
  category: string;
  question: string;
  description: string;
  template: string;
  testCases: Array<{ input: string; output: string }>;
  answer: string;
  timeLimit: number; // in minutes
  followUpQuestions: {
    mcq: Array<{
      question: string;
      options: string[];
      correctAnswer: string;
      timeLimit: number; // in seconds
    }>;
    concept: Array<{
      question: string;
      expectedAnswer: string;
      timeLimit: number; // in seconds
    }>;
    tricky: Array<{
      question: string;
      expectedAnswer: string;
      timeLimit: number; // in seconds
    }>;
  };
}

export const questions: Question[] = [
  {
    id: 1,
    type: 'DSA',
    difficulty: 'Medium',
    category: 'Data Structures',
    question: 'Implement a LRU Cache',
    description: 'Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.',
    template: `class LRUCache {
  constructor(capacity) {
    // Initialize your data structure here
  }

  get(key) {
    // Implement get operation
  }

  put(key, value) {
    // Implement put operation
  }
}`,
    testCases: [
      { input: "cache = new LRUCache(2); cache.put(1, 1); cache.put(2, 2); cache.get(1);", output: "1" },
      { input: "cache.put(3, 3); cache.get(2);", output: "-1" }
    ],
    answer: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}`,
    timeLimit: 20,
    followUpQuestions: {
      mcq: [
        {
          question: "What is the time complexity of the get operation in LRU Cache?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
          correctAnswer: "O(1)",
          timeLimit: 10
        },
        {
          question: "Which data structure is used to maintain the order of elements in LRU Cache?",
          options: ["Array", "Map", "Set", "Queue"],
          correctAnswer: "Map",
          timeLimit: 10
        },
        {
          question: "What happens when the cache is full and a new element needs to be added?",
          options: [
            "The oldest element is removed",
            "The newest element is removed",
            "The least recently used element is removed",
            "The most recently used element is removed"
          ],
          correctAnswer: "The least recently used element is removed",
          timeLimit: 10
        }
      ],
      concept: [
        {
          question: "Explain how the LRU Cache maintains the order of elements and why this approach is efficient.",
          expectedAnswer: "The LRU Cache uses a Map data structure to maintain O(1) access time. When an element is accessed, it's removed and re-added to maintain the order. This ensures that the least recently used element is always at the beginning of the Map.",
          timeLimit: 90
        }
      ],
      tricky: [
        {
          question: "How would you modify the LRU Cache to handle concurrent access from multiple threads?",
          expectedAnswer: "We would need to add synchronization mechanisms like mutexes or locks to ensure thread safety. We could also consider using a concurrent hash map implementation.",
          timeLimit: 90
        }
      ]
    }
  },
  {
    id: 2,
    type: 'System Design',
    difficulty: 'Hard',
    category: 'Distributed Systems',
    question: 'Design a real-time chat system',
    description: 'Design a scalable real-time chat system that can handle millions of concurrent users.',
    template: `class ChatSystem {
  constructor() {
    // Initialize your system here
  }

  sendMessage(userId, message) {
    // Implement message sending
  }

  getMessages(channelId) {
    // Implement message retrieval
  }
}`,
    testCases: [
      { input: "system = new ChatSystem(); system.sendMessage(1, 'Hello');", output: "Message sent" },
      { input: "system.getMessages('general');", output: "['Hello']" }
    ],
    answer: `class ChatSystem {
  constructor() {
    this.channels = new Map();
    this.users = new Map();
    this.messageQueue = [];
  }

  sendMessage(userId, message) {
    if (!this.users.has(userId)) {
      throw new Error('User not found');
    }
    const channel = this.channels.get('general') || [];
    const messageObj = {
      userId,
      message,
      timestamp: Date.now(),
      id: Math.random().toString(36).substr(2, 9)
    };
    channel.push(messageObj);
    this.channels.set('general', channel);
    this.messageQueue.push(messageObj);
    return 'Message sent';
  }

  getMessages(channelId) {
    return this.channels.get(channelId) || [];
  }
}`,
    timeLimit: 20,
    followUpQuestions: {
      mcq: [
        {
          question: "Which protocol would you use for real-time message delivery?",
          options: ["HTTP", "WebSocket", "FTP", "SMTP"],
          correctAnswer: "WebSocket",
          timeLimit: 10
        },
        {
          question: "What's the best way to handle message persistence?",
          options: [
            "In-memory storage",
            "File system",
            "Distributed database",
            "Local database"
          ],
          correctAnswer: "Distributed database",
          timeLimit: 10
        },
        {
          question: "How would you handle message delivery guarantees?",
          options: [
            "At-most-once delivery",
            "At-least-once delivery",
            "Exactly-once delivery",
            "No delivery guarantees"
          ],
          correctAnswer: "At-least-once delivery",
          timeLimit: 10
        }
      ],
      concept: [
        {
          question: "Explain how you would scale this system to handle millions of concurrent users.",
          expectedAnswer: "We would need to implement horizontal scaling using multiple servers, load balancing, message queues for async processing, and a distributed database for message storage. We'd also need to implement proper caching and CDN for static content.",
          timeLimit: 90
        }
      ],
      tricky: [
        {
          question: "How would you handle message ordering and consistency across multiple servers?",
          expectedAnswer: "We could use vector clocks or logical timestamps to maintain message ordering. For consistency, we'd implement a consensus protocol like Paxos or Raft, and use a distributed transaction system.",
          timeLimit: 90
        }
      ]
    }
  },
  {
    id: 3,
    type: 'Reverse Engineering',
    difficulty: 'Hard',
    category: 'Security',
    question: 'Analyze and fix a vulnerable authentication system',
    description: 'Given a vulnerable authentication system, identify security issues and implement fixes.',
    template: `class AuthSystem {
  constructor() {
    // Initialize your system here
  }

  login(username, password) {
    // Implement secure login
  }

  validateToken(token) {
    // Implement token validation
  }
}`,
    testCases: [
      { input: "auth = new AuthSystem(); auth.login('user', 'pass');", output: "token" },
      { input: "auth.validateToken('token');", output: "true" }
    ],
    answer: `class AuthSystem {
  constructor() {
    this.users = new Map();
    this.tokens = new Map();
  }

  async login(username, password) {
    const user = this.users.get(username);
    if (!user) throw new Error('User not found');
    
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) throw new Error('Invalid password');
    
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    this.tokens.set(token, { userId: user.id, expiresAt: Date.now() + 3600000 });
    return token;
  }

  validateToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const storedToken = this.tokens.get(token);
      
      if (!storedToken || storedToken.expiresAt < Date.now()) {
        return false;
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }
}`,
    timeLimit: 20,
    followUpQuestions: {
      mcq: [
        {
          question: "Which of these is NOT a secure way to store passwords?",
          options: [
            "MD5 hashing",
            "bcrypt",
            "Argon2",
            "PBKDF2"
          ],
          correctAnswer: "MD5 hashing",
          timeLimit: 10
        },
        {
          question: "What's the purpose of JWT expiration?",
          options: [
            "Reduce server load",
            "Prevent token reuse",
            "Limit user sessions",
            "All of the above"
          ],
          correctAnswer: "All of the above",
          timeLimit: 10
        },
        {
          question: "Which attack is prevented by using bcrypt?",
          options: [
            "XSS",
            "CSRF",
            "Rainbow table",
            "SQL Injection"
          ],
          correctAnswer: "Rainbow table",
          timeLimit: 10
        }
      ],
      concept: [
        {
          question: "Explain the security measures implemented in the authentication system and why they're necessary.",
          expectedAnswer: "The system uses bcrypt for password hashing to prevent rainbow table attacks, JWT for stateless authentication, token expiration to limit session duration, and proper error handling to prevent information leakage.",
          timeLimit: 90
        }
      ],
      tricky: [
        {
          question: "How would you handle token refresh and revocation in a distributed system?",
          expectedAnswer: "We would implement a token refresh mechanism using refresh tokens, store token blacklists in a distributed cache like Redis, and use a distributed lock mechanism to handle concurrent token operations.",
          timeLimit: 90
        }
      ]
    }
  },
  {
    id: 4,
    type: 'DSA',
    difficulty: 'Medium',
    category: 'Graphs',
    question: 'Implement a Graph with BFS and DFS',
    description: 'Design and implement a Graph data structure with Breadth-First Search (BFS) and Depth-First Search (DFS) traversal methods.',
    template: `class Graph {
  constructor() {
    // Initialize your graph here
  }

  addVertex(vertex) {
    // Add a vertex to the graph
  }

  addEdge(vertex1, vertex2) {
    // Add an edge between two vertices
  }

  bfs(startVertex) {
    // Implement BFS traversal
  }

  dfs(startVertex) {
    // Implement DFS traversal
  }
}`,
    testCases: [
      { input: "graph = new Graph(); graph.addVertex('A'); graph.addVertex('B'); graph.addEdge('A', 'B'); graph.bfs('A');", output: "['A', 'B']" },
      { input: "graph.dfs('A');", output: "['A', 'B']" }
    ],
    answer: `class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList.get(vertex1).push(vertex2);
    this.adjacencyList.get(vertex2).push(vertex1);
  }

  bfs(startVertex) {
    const visited = new Set();
    const queue = [startVertex];
    const result = [];

    visited.add(startVertex);

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      for (const neighbor of this.adjacencyList.get(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  dfs(startVertex) {
    const visited = new Set();
    const result = [];

    const dfsHelper = (vertex) => {
      visited.add(vertex);
      result.push(vertex);

      for (const neighbor of this.adjacencyList.get(vertex)) {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor);
        }
      }
    };

    dfsHelper(startVertex);
    return result;
  }
}`,
    timeLimit: 20,
    followUpQuestions: {
      mcq: [
        {
          question: "What is the time complexity of BFS in a graph with V vertices and E edges?",
          options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"],
          correctAnswer: "O(V + E)",
          timeLimit: 10
        },
        {
          question: "Which data structure is typically used to implement BFS?",
          options: ["Stack", "Queue", "Heap", "Tree"],
          correctAnswer: "Queue",
          timeLimit: 10
        },
        {
          question: "What is the main difference between BFS and DFS?",
          options: [
            "BFS uses more memory",
            "DFS is always faster",
            "BFS explores level by level, DFS goes deep first",
            "DFS can't handle cycles"
          ],
          correctAnswer: "BFS explores level by level, DFS goes deep first",
          timeLimit: 10
        }
      ],
      concept: [
        {
          question: "Explain when you would choose BFS over DFS and vice versa in real-world applications.",
          expectedAnswer: "BFS is better for finding shortest paths and when we need to explore all nodes at the same level. DFS is better for exploring deep paths, solving puzzles, and when memory is a concern. BFS is used in GPS navigation, while DFS is used in maze solving and game tree exploration.",
          timeLimit: 90
        }
      ],
      tricky: [
        {
          question: "How would you modify the graph implementation to handle weighted edges and find the shortest path using Dijkstra's algorithm?",
          expectedAnswer: "We would modify the adjacency list to store edge weights, implement a priority queue for Dijkstra's algorithm, and add a method to find the shortest path between two vertices using the algorithm.",
          timeLimit: 90
        }
      ]
    }
  },
  {
    id: 5,
    type: 'System Design',
    difficulty: 'Hard',
    category: 'Caching',
    question: 'Design a Distributed Cache System',
    description: 'Design a distributed caching system that can handle high throughput and maintain consistency across multiple nodes.',
    template: `class DistributedCache {
  constructor() {
    // Initialize your cache system here
  }

  set(key, value, ttl) {
    // Set a value in the cache with TTL
  }

  get(key) {
    // Get a value from the cache
  }

  invalidate(key) {
    // Invalidate a cache entry
  }
}`,
    testCases: [
      { input: "cache = new DistributedCache(); cache.set('key', 'value', 3600); cache.get('key');", output: "'value'" },
      { input: "cache.invalidate('key'); cache.get('key');", output: "null" }
    ],
    answer: `class DistributedCache {
  constructor() {
    this.nodes = new Map();
    this.consistentHash = new ConsistentHash();
    this.replicationFactor = 3;
  }

  async set(key, value, ttl) {
    const nodeIds = this.consistentHash.getNodes(key, this.replicationFactor);
    const timestamp = Date.now();
    
    const promises = nodeIds.map(nodeId => 
      this.nodes.get(nodeId).set(key, {
        value,
        timestamp,
        ttl
      })
    );
    
    await Promise.all(promises);
    return true;
  }

  async get(key) {
    const nodeId = this.consistentHash.getNode(key);
    const node = this.nodes.get(nodeId);
    
    const data = await node.get(key);
    if (!data) return null;
    
    if (Date.now() - data.timestamp > data.ttl * 1000) {
      await this.invalidate(key);
      return null;
    }
    
    return data.value;
  }

  async invalidate(key) {
    const nodeIds = this.consistentHash.getNodes(key, this.replicationFactor);
    const promises = nodeIds.map(nodeId =>
      this.nodes.get(nodeId).delete(key)
    );
    
    await Promise.all(promises);
    return true;
  }
}`,
    timeLimit: 20,
    followUpQuestions: {
      mcq: [
        {
          question: "Which consistency model is typically used in distributed caching?",
          options: [
            "Strong consistency",
            "Eventual consistency",
            "Linear consistency",
            "Sequential consistency"
          ],
          correctAnswer: "Eventual consistency",
          timeLimit: 10
        },
        {
          question: "What is the purpose of consistent hashing in distributed caching?",
          options: [
            "To encrypt cache data",
            "To distribute load evenly across nodes",
            "To compress cache data",
            "To validate cache entries"
          ],
          correctAnswer: "To distribute load evenly across nodes",
          timeLimit: 10
        },
        {
          question: "How does replication help in a distributed cache?",
          options: [
            "It reduces memory usage",
            "It improves read performance and fault tolerance",
            "It simplifies the implementation",
            "It reduces network latency"
          ],
          correctAnswer: "It improves read performance and fault tolerance",
          timeLimit: 10
        }
      ],
      concept: [
        {
          question: "Explain the trade-offs between consistency, availability, and partition tolerance in a distributed cache system.",
          expectedAnswer: "In a distributed cache, we often prioritize availability and partition tolerance over strong consistency. This means we accept eventual consistency to ensure the system remains available during network partitions. We use techniques like vector clocks and conflict resolution to handle inconsistencies.",
          timeLimit: 90
        }
      ],
      tricky: [
        {
          question: "How would you handle cache invalidation across multiple data centers with different network latencies?",
          expectedAnswer: "We would implement a multi-level cache invalidation strategy using a message queue system. Each data center would have its own invalidation queue, and we'd use a global coordinator to ensure eventual consistency. We'd also implement versioning and timestamps to handle race conditions.",
          timeLimit: 90
        }
      ]
    }
  },
  {
    id: 6,
    type: 'Reverse Engineering',
    difficulty: 'Hard',
    category: 'Malware Analysis',
    question: 'Analyze and Reverse Engineer a Malicious Binary',
    description: 'Given a suspicious binary file, analyze its behavior and implement a safe execution environment.',
    template: `class BinaryAnalyzer {
  constructor() {
    // Initialize your analyzer here
  }

  analyze(binaryData) {
    // Analyze the binary for suspicious patterns
  }

  executeSafely(binaryData) {
    // Execute the binary in a safe environment
  }

  generateReport() {
    // Generate analysis report
  }
}`,
    testCases: [
      { input: "analyzer = new BinaryAnalyzer(); analyzer.analyze(suspiciousBinary);", output: "{ risk: 'high', patterns: ['network', 'file_system'] }" },
      { input: "analyzer.executeSafely(suspiciousBinary);", output: "{ status: 'safe', logs: [] }" }
    ],
    answer: `class BinaryAnalyzer {
  constructor() {
    this.sandbox = new Sandbox();
    this.patterns = new Map();
    this.initializePatterns();
  }

  initializePatterns() {
    this.patterns.set('network', /socket|connect|send|recv/);
    this.patterns.set('file_system', /open|write|read|delete/);
    this.patterns.set('registry', /RegOpenKey|RegSetValue/);
    this.patterns.set('process', /CreateProcess|ShellExecute/);
  }

  analyze(binaryData) {
    const results = {
      risk: 'low',
      patterns: []
    };

    for (const [type, pattern] of this.patterns) {
      if (pattern.test(binaryData)) {
        results.patterns.push(type);
        results.risk = 'high';
      }
    }

    return results;
  }

  async executeSafely(binaryData) {
    const analysis = this.analyze(binaryData);
    
    if (analysis.risk === 'high') {
      throw new Error('Binary contains suspicious patterns');
    }

    const result = await this.sandbox.execute(binaryData, {
      network: false,
      fileSystem: true,
      registry: false,
      process: false
    });

    return {
      status: 'safe',
      logs: result.logs
    };
  }

  generateReport() {
    return {
      timestamp: Date.now(),
      analysis: this.analyze(this.currentBinary),
      execution: this.sandbox.getLogs()
    };
  }
}`,
    timeLimit: 20,
    followUpQuestions: {
      mcq: [
        {
          question: "What is the purpose of a sandbox in malware analysis?",
          options: [
            "To speed up execution",
            "To isolate and monitor program behavior",
            "To compress the binary",
            "To encrypt the binary"
          ],
          correctAnswer: "To isolate and monitor program behavior",
          timeLimit: 10
        },
        {
          question: "Which of these is NOT a common malware analysis technique?",
          options: [
            "Static analysis",
            "Dynamic analysis",
            "Behavioral analysis",
            "Compression analysis"
          ],
          correctAnswer: "Compression analysis",
          timeLimit: 10
        },
        {
          question: "What is the main advantage of static analysis over dynamic analysis?",
          options: [
            "It's faster",
            "It can detect obfuscated code",
            "It doesn't require execution",
            "It uses less memory"
          ],
          correctAnswer: "It doesn't require execution",
          timeLimit: 10
        }
      ],
      concept: [
        {
          question: "Explain the different types of malware analysis techniques and when to use each one.",
          expectedAnswer: "Static analysis examines code without execution, useful for initial screening. Dynamic analysis runs code in a controlled environment to observe behavior. Behavioral analysis focuses on patterns and actions. We use static analysis first, then dynamic if needed, and behavioral for ongoing monitoring.",
          timeLimit: 90
        }
      ],
      tricky: [
        {
          question: "How would you handle polymorphic malware that changes its code structure to evade detection?",
          expectedAnswer: "We would implement multiple analysis layers: signature-based detection, behavioral analysis, and machine learning pattern recognition. We'd also use code emulation to handle self-modifying code and implement heuristics to detect obfuscation techniques.",
          timeLimit: 90
        }
      ]
    }
  },
  {
    id: 7,
    type: 'DSA',
    difficulty: 'Medium',
    category: 'Trees',
    question: 'Implement a Binary Search Tree with Balancing',
    description: 'Design and implement a self-balancing Binary Search Tree (AVL Tree) with insertion, deletion, and search operations.',
    template: `class AVLTree {
  constructor() {
    // Initialize your tree here
  }

  insert(value) {
    // Insert a value and maintain balance
  }

  delete(value) {
    // Delete a value and maintain balance
  }

  search(value) {
    // Search for a value
  }
}`,
    testCases: [
      { input: "tree = new AVLTree(); tree.insert(5); tree.insert(3); tree.insert(7); tree.search(3);", output: "true" },
      { input: "tree.delete(3); tree.search(3);", output: "false" }
    ],
    answer: `class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  updateHeight(node) {
    node.height = Math.max(
      this.getHeight(node.left),
      this.getHeight(node.right)
    ) + 1;
  }

  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (!node) {
      return { value, left: null, right: null, height: 1 };
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node;
    }

    this.updateHeight(node);

    const balance = this.getBalance(node);

    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }

    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }

    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  search(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (!node || node.value === value) {
      return !!node;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    }

    return this.searchNode(node.right, value);
  }
}`,
    timeLimit: 20,
    followUpQuestions: {
      mcq: [
        {
          question: "What is the time complexity of search in an AVL tree?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          correctAnswer: "O(log n)",
          timeLimit: 10
        },
        {
          question: "Why do we need to balance a binary search tree?",
          options: [
            "To reduce memory usage",
            "To maintain O(log n) operations",
            "To make it look prettier",
            "To support concurrent access"
          ],
          correctAnswer: "To maintain O(log n) operations",
          timeLimit: 10
        },
        {
          question: "What is the maximum height difference allowed between left and right subtrees in an AVL tree?",
          options: ["0", "1", "2", "3"],
          correctAnswer: "1",
          timeLimit: 10
        }
      ],
      concept: [
        {
          question: "Explain the different rotation operations in AVL trees and when they are used.",
          expectedAnswer: "AVL trees use four types of rotations: left, right, left-right, and right-left. Left rotation is used when the right subtree is too heavy, right rotation when the left subtree is too heavy. Double rotations (left-right and right-left) are used when the imbalance is in the inner subtree.",
          timeLimit: 90
        }
      ],
      tricky: [
        {
          question: "How would you modify the AVL tree to support range queries efficiently?",
          expectedAnswer: "We would add a size field to each node to track the number of nodes in its subtree. This allows us to perform range queries in O(log n) time by using the size information to skip irrelevant subtrees.",
          timeLimit: 90
        }
      ]
    }
  },
  {
    id: 8,
    type: 'System Design',
    difficulty: 'Hard',
    category: 'Search',
    question: 'Design a Real-time Search Engine',
    description: 'Design a real-time search engine that can handle millions of queries per second and provide instant results.',
    template: `class SearchEngine {
  constructor() {
    // Initialize your search engine here
  }

  index(document) {
    // Index a document
  }

  search(query) {
    // Search for documents
  }

  update(document) {
    // Update an indexed document
  }
}`,
    testCases: [
      { input: "engine = new SearchEngine(); engine.index({ id: 1, text: 'hello world' }); engine.search('hello');", output: "[{ id: 1, text: 'hello world' }]" },
      { input: "engine.update({ id: 1, text: 'hello there' }); engine.search('world');", output: "[]" }
    ],
    answer: `class SearchEngine {
  constructor() {
    this.invertedIndex = new Map();
    this.documents = new Map();
    this.trie = new Trie();
  }

  async index(document) {
    const tokens = this.tokenize(document.text);
    const docId = document.id;

    // Update inverted index
    for (const token of tokens) {
      if (!this.invertedIndex.has(token)) {
        this.invertedIndex.set(token, new Set());
      }
      this.invertedIndex.get(token).add(docId);
    }

    // Update trie for autocomplete
    for (const token of tokens) {
      this.trie.insert(token);
    }

    // Store document
    this.documents.set(docId, document);

    // Update search clusters
    await this.updateSearchClusters(docId, tokens);
  }

  async search(query) {
    const tokens = this.tokenize(query);
    const results = new Set();

    // Get initial results from inverted index
    for (const token of tokens) {
      const docIds = this.invertedIndex.get(token) || new Set();
      if (results.size === 0) {
        docIds.forEach(id => results.add(id));
      } else {
        results.forEach(id => {
          if (!docIds.has(id)) {
            results.delete(id);
          }
        });
      }
    }

    // Rank results
    const rankedResults = await this.rankResults(
      Array.from(results).map(id => this.documents.get(id)),
      query
    );

    return rankedResults;
  }

  async update(document) {
    const oldDoc = this.documents.get(document.id);
    if (oldDoc) {
      // Remove old document from index
      const oldTokens = this.tokenize(oldDoc.text);
      for (const token of oldTokens) {
        this.invertedIndex.get(token)?.delete(document.id);
      }
    }

    // Index new document
    await this.index(document);
  }

  tokenize(text) {
    return text.toLowerCase()
      .replace(/[^a-z0-9\\s]/g, '')
      .split('\\s+')
      .filter(token => token.length > 0);
  }

  async rankResults(documents, query) {
    // Implement TF-IDF ranking
    return documents.sort((a, b) => {
      const scoreA = this.calculateScore(a, query);
      const scoreB = this.calculateScore(b, query);
      return scoreB - scoreA;
    });
  }

  calculateScore(document, query) {
    // Simple TF-IDF implementation
    const tokens = this.tokenize(document.text);
    const queryTokens = this.tokenize(query);
    let score = 0;

    for (const token of queryTokens) {
      const tf = tokens.filter(t => t === token).length;
      const idf = Math.log(this.documents.size / (this.invertedIndex.get(token)?.size || 1));
      score += tf * idf;
    }

    return score;
  }
}`,
    timeLimit: 20,
    followUpQuestions: {
      mcq: [
        {
          question: "What is the purpose of an inverted index in a search engine?",
          options: [
            "To compress data",
            "To map terms to documents",
            "To encrypt search results",
            "To validate queries"
          ],
          correctAnswer: "To map terms to documents",
          timeLimit: 10
        },
        {
          question: "Which ranking algorithm is commonly used in search engines?",
          options: [
            "Bubble Sort",
            "Quick Sort",
            "TF-IDF",
            "Binary Search"
          ],
          correctAnswer: "TF-IDF",
          timeLimit: 10
        },
        {
          question: "What is the main advantage of using a trie data structure in search?",
          options: [
            "Faster insertion",
            "Prefix matching",
            "Better memory usage",
            "Easier implementation"
          ],
          correctAnswer: "Prefix matching",
          timeLimit: 10
        }
      ],
      concept: [
        {
          question: "Explain how you would scale this search engine to handle millions of queries per second.",
          expectedAnswer: "We would implement horizontal scaling using multiple search clusters, load balancing, and caching. Each cluster would handle a subset of the index, and we'd use a distributed cache for frequent queries. We'd also implement query routing and result aggregation.",
          timeLimit: 90
        }
      ],
      tricky: [
        {
          question: "How would you handle real-time updates to the search index without affecting query performance?",
          expectedAnswer: "We would implement a dual-write system with a write-through cache. Updates would go to both the cache and a message queue. Background workers would process the queue to update the index. We'd use versioning to handle consistency and implement a bloom filter to quickly check if a document needs updating.",
          timeLimit: 90
        }
      ]
    }
  },
  {
    id: 9,
    type: 'Reverse Engineering',
    difficulty: 'Hard',
    category: 'Protocol Analysis',
    question: 'Reverse Engineer a Network Protocol',
    description: 'Analyze and implement a client for a custom network protocol based on captured traffic.',
    template: `class ProtocolAnalyzer {
  constructor() {
    // Initialize your analyzer here
  }

  analyze(packet) {
    // Analyze a network packet
  }

  implementClient() {
    // Implement a client for the protocol
  }

  generateDocumentation() {
    // Generate protocol documentation
  }
}`,
    testCases: [
      { input: "analyzer = new ProtocolAnalyzer(); analyzer.analyze(packet);", output: "{ type: 'request', method: 'GET', path: '/api/data' }" },
      { input: "client = analyzer.implementClient(); client.request('/api/data');", output: "{ status: 200, data: {} }" }
    ],
    answer: `class ProtocolAnalyzer {
  constructor() {
    this.packetTypes = new Map();
    this.messageQueue = [];
    this.sequenceNumber = 0;
  }

  analyze(packet) {
    const header = this.parseHeader(packet);
    const payload = this.parsePayload(packet);

    this.packetTypes.set(header.type, {
      structure: this.inferStructure(payload),
      handler: this.createHandler(header.type)
    });

    return {
      type: header.type,
      ...payload
    };
  }

  implementClient() {
    return {
      request: async (path, data) => {
        const packet = this.createPacket('request', {
          path,
          data,
          sequence: this.sequenceNumber++
        });

        const response = await this.sendPacket(packet);
        return this.handleResponse(response);
      },

      subscribe: (path, callback) => {
        const packet = this.createPacket('subscribe', {
          path,
          sequence: this.sequenceNumber++
        });

        this.messageQueue.push({
          packet,
          callback
        });

        return this.sendPacket(packet);
      }
    };
  }

  createPacket(type, payload) {
    const header = {
      type,
      version: 1,
      timestamp: Date.now(),
      length: this.calculateLength(payload)
    };

    return this.serialize({
      header,
      payload
    });
  }

  parseHeader(packet) {
    // Implement header parsing based on protocol analysis
    return {
      type: packet.readUInt8(0),
      version: packet.readUInt8(1),
      timestamp: packet.readUInt32BE(2),
      length: packet.readUInt16BE(6)
    };
  }

  parsePayload(packet) {
    const header = this.parseHeader(packet);
    const payloadData = packet.slice(8, 8 + header.length);
    
    return this.deserialize(payloadData);
  }

  inferStructure(payload) {
    // Analyze payload patterns to infer structure
    const structure = {
      fields: new Map(),
      types: new Map()
    };

    for (const [key, value] of Object.entries(payload)) {
      structure.fields.set(key, typeof value);
      structure.types.set(key, this.inferType(value));
    }

    return structure;
  }

  createHandler(type) {
    return (packet) => {
      const payload = this.parsePayload(packet);
      
      switch (type) {
        case 'request':
          return this.handleRequest(payload);
        case 'response':
          return this.handleResponse(payload);
        case 'subscribe':
          return this.handleSubscribe(payload);
        default:
          throw new Error('Unknown packet type: ' + type);
      }
    };
  }

  generateDocumentation() {
    const docs = {
      version: '1.0',
      packetTypes: {},
      examples: []
    };

    for (const [type, info] of this.packetTypes) {
      docs.packetTypes[type] = {
        structure: info.structure,
        description: this.generateTypeDescription(type)
      };
    }

    return docs;
  }
}`,
    timeLimit: 20,
    followUpQuestions: {
      mcq: [
        {
          question: "What is the purpose of sequence numbers in network protocols?",
          options: [
            "To encrypt data",
            "To order packets",
            "To compress data",
            "To validate packets"
          ],
          correctAnswer: "To order packets",
          timeLimit: 10
        },
        {
          question: "Which tool is commonly used for network protocol analysis?",
          options: [
            "Wireshark",
            "GDB",
            "Valgrind",
            "Strace"
          ],
          correctAnswer: "Wireshark",
          timeLimit: 10
        },
        {
          question: "What is the main challenge in reverse engineering a network protocol?",
          options: [
            "Memory usage",
            "Processing speed",
            "Protocol obfuscation",
            "Network latency"
          ],
          correctAnswer: "Protocol obfuscation",
          timeLimit: 10
        }
      ],
      concept: [
        {
          question: "Explain the process of reverse engineering a network protocol from captured traffic.",
          expectedAnswer: "The process involves capturing network traffic, analyzing packet patterns, identifying headers and payloads, inferring data structures, and implementing a client. We use tools like Wireshark for capture and analysis, and we look for patterns in packet sequences and data formats.",
          timeLimit: 90
        }
      ],
      tricky: [
        {
          question: "How would you handle encrypted or obfuscated network protocols?",
          expectedAnswer: "We would use dynamic analysis to intercept traffic before encryption/after decryption, analyze the encryption implementation, and potentially use memory analysis to understand the protocol. We might also use machine learning to identify patterns in encrypted traffic.",
          timeLimit: 90
        }
      ]
    }
  },
  {
    id: 10,
    type: 'DSA',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    question: 'Implement a Text Justification Algorithm',
    description: 'Implement an algorithm to justify text by distributing spaces evenly between words.',
    template: `class TextJustifier {
  constructor() {
    // Initialize your justifier here
  }

  justify(words, maxWidth) {
    // Justify the text
  }

  distributeSpaces(line, maxWidth) {
    // Distribute spaces evenly
  }
}`,
    testCases: [
      { input: "justifier = new TextJustifier(); justifier.justify(['This', 'is', 'a', 'test'], 16);", output: "['This    is    a', 'test            ']" },
      { input: "justifier.justify(['Hello', 'world'], 11);", output: "['Hello world']" }
    ],
    answer: `class TextJustifier {
  constructor() {
    this.cache = new Map();
  }

  justify(words, maxWidth) {
    const n = words.length;
    const dp = Array(n + 1).fill(Infinity);
    const breaks = Array(n + 1).fill(0);
    
    dp[0] = 0;
    
    for (let i = 1; i <= n; i++) {
      let width = 0;
      
      for (let j = i - 1; j >= 0; j--) {
        width += words[j].length;
        
        if (width > maxWidth) {
          break;
        }
        
        const cost = this.calculateCost(words, j, i - 1, maxWidth);
        
        if (dp[j] + cost < dp[i]) {
          dp[i] = dp[j] + cost;
          breaks[i] = j;
        }
        
        width += 1; // Add space
      }
    }
    
    return this.reconstructLines(words, breaks, maxWidth);
  }

  calculateCost(words, start, end, maxWidth) {
    const lineLength = words
      .slice(start, end + 1)
      .reduce((sum, word) => sum + word.length, 0);
    
    const spaces = end - start;
    const totalLength = lineLength + spaces;
    
    if (totalLength > maxWidth) {
      return Infinity;
    }
    
    if (end === words.length - 1) {
      return 0;
    }
    
    return Math.pow(maxWidth - totalLength, 2);
  }

  reconstructLines(words, breaks, maxWidth) {
    const lines = [];
    let end = words.length;
    
    while (end > 0) {
      const start = breaks[end];
      const line = words.slice(start, end);
      lines.unshift(this.distributeSpaces(line, maxWidth));
      end = start;
    }
    
    return lines;
  }

  distributeSpaces(line, maxWidth) {
    if (line.length === 1) {
      return line[0] + ' '.repeat(maxWidth - line[0].length);
    }
    
    const totalSpaces = maxWidth - line.reduce((sum, word) => sum + word.length, 0);
    const baseSpaces = Math.floor(totalSpaces / (line.length - 1));
    const extraSpaces = totalSpaces % (line.length - 1);
    
    let result = line[0];
    
    for (let i = 1; i < line.length; i++) {
      const spaces = baseSpaces + (i <= extraSpaces ? 1 : 0);
      result += ' '.repeat(spaces) + line[i];
    }
    
    return result;
  }
}`,
    timeLimit: 20,
    followUpQuestions: {
      mcq: [
        {
          question: "What is the time complexity of the text justification algorithm?",
          options: ["O(n)", "O(n²)", "O(n log n)", "O(2ⁿ)"],
          correctAnswer: "O(n²)",
          timeLimit: 10
        },
        {
          question: "Why do we use dynamic programming for text justification?",
          options: [
            "To reduce memory usage",
            "To find the optimal line breaks",
            "To speed up execution",
            "To handle multiple languages"
          ],
          correctAnswer: "To find the optimal line breaks",
          timeLimit: 10
        },
        {
          question: "What is the main challenge in text justification?",
          options: [
            "Memory management",
            "Space distribution",
            "Word splitting",
            "Character encoding"
          ],
          correctAnswer: "Space distribution",
          timeLimit: 10
        }
      ],
      concept: [
        {
          question: "Explain how the dynamic programming approach helps in finding the optimal text justification.",
          expectedAnswer: "Dynamic programming helps by breaking down the problem into subproblems. For each position, we try different line breaks and choose the one that minimizes the total cost (badness) of the justification. We use a cost function that penalizes uneven space distribution.",
          timeLimit: 90
        }
      ],
      tricky: [
        {
          question: "How would you modify the algorithm to handle different justification styles (left, right, center) and hyphenation?",
          expectedAnswer: "We would modify the cost function to account for different justification styles and add a hyphenation module. For different styles, we'd adjust the space distribution logic. For hyphenation, we'd add a dictionary and rules for splitting words at appropriate points.",
          timeLimit: 90
        }
      ]
    }
  }
]; 