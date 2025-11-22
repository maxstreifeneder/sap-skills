# Orchestration Service Guide

Complete guide for SAP AI Core Orchestration Service using SAP Cloud SDK for AI.

## Table of Contents
1. [Overview](#overview)
2. [Installation](#installation)
3. [Chat Completion](#chat-completion)
4. [Streaming](#streaming)
5. [Prompt Templating](#prompt-templating)
6. [Message History](#message-history)
7. [Content Filtering](#content-filtering)
8. [Data Masking](#data-masking)
9. [Document Grounding](#document-grounding)
10. [Translation](#translation)
11. [Function Calling](#function-calling)
12. [Response Formatting](#response-formatting)
13. [Image Recognition](#image-recognition)
14. [Embedding](#embedding)
15. [Custom Configuration](#custom-configuration)

---

## Overview

The Orchestration Service provides a harmonized API for multiple LLM providers through SAP AI Core. Switch between models without code changes.

### Supported Models

| Provider | Models |
|----------|--------|
| OpenAI | gpt-4o, gpt-4o-mini, o1, o3-mini |
| Anthropic (AWS) | claude-3-5-sonnet, claude-4 |
| Amazon | amazon-nova-pro, amazon-nova-lite, amazon-nova-micro |
| Google | gemini-2.5-flash, gemini-2.0-flash |
| Mistral | mistral-medium-instruct, mistral-large |
| Cohere | command-a-reasoning |
| Perplexity | sonar variants |

---

## Installation

### JavaScript/TypeScript

```bash
npm install @sap-ai-sdk/orchestration
```

### Java (Maven)

```xml
<dependency>
  <groupId>com.sap.ai.sdk</groupId>
  <artifactId>orchestration</artifactId>
  <version>${ai-sdk.version}</version>
</dependency>
```

---

## Chat Completion

### JavaScript

```typescript
import { OrchestrationClient } from '@sap-ai-sdk/orchestration';

const client = new OrchestrationClient({
  promptTemplating: {
    model: { name: 'gpt-4o' },
    prompt: [{ role: 'user', content: '{{?question}}' }]
  }
});

const response = await client.chatCompletion({
  placeholderValues: { question: 'What is SAP CAP?' }
});

// Response helpers
console.log(response.getContent());           // Model output
console.log(response.getTokenUsage());        // Token metrics
console.log(response.getFinishReason());      // Completion reason
console.log(response.getAllMessages());       // Message history
console.log(response.getAssistantMessage()); // Assistant response
```

### Java

```java
var client = new OrchestrationClient();
var config = new OrchestrationModuleConfig()
    .withLlmConfig(OrchestrationAiModel.GPT_4O);

var prompt = new OrchestrationPrompt("What is SAP CAP?");
var result = client.chatCompletion(prompt, config);

String content = result.getContent();
```

### Model Parameters

```typescript
// JavaScript
const client = new OrchestrationClient({
  promptTemplating: {
    model: {
      name: 'gpt-4o',
      version: 'latest',
      parameters: {
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.5
      }
    }
  }
});
```

```java
// Java
var config = new OrchestrationModuleConfig()
    .withLlmConfig(OrchestrationAiModel.GPT_4O
        .withParam("max_tokens", 1000)
        .withParam("temperature", 0.7));
```

---

## Streaming

### JavaScript

```typescript
// Basic streaming
const stream = client.stream({
  placeholderValues: { question: 'Explain CAP in detail' }
});

for await (const chunk of stream.toContentStream()) {
  process.stdout.write(chunk);
}

// After streaming completes
console.log(stream.getFinishReason());
console.log(stream.getTokenUsage());

// Abort streaming
const controller = new AbortController();
const stream = client.stream(
  { placeholderValues: { question: 'Long response...' } },
  { signal: controller.signal }
);

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);
```

### Java

```java
// Blocking stream
client.streamChatCompletion(prompt, config)
    .forEach(chunk -> System.out.print(chunk.getDeltaContent()));

// Non-blocking with callback
AtomicReference<String> result = new AtomicReference<>("");
client.streamChatCompletion(prompt, config)
    .forEach(chunk -> result.updateAndGet(s -> s + chunk.getDeltaContent()));
```

---

## Prompt Templating

### Inline Templates (JavaScript)

```typescript
const client = new OrchestrationClient({
  promptTemplating: {
    model: { name: 'gpt-4o' },
    prompt: [
      { role: 'system', content: 'You are a helpful assistant for {{?domain}}.' },
      { role: 'user', content: '{{?question}}' }
    ]
  }
});

const response = await client.chatCompletion({
  placeholderValues: {
    domain: 'SAP development',
    question: 'What is CDS?'
  }
});
```

### Prompt Registry Reference

```typescript
// JavaScript - by ID
const client = new OrchestrationClient({
  promptTemplating: {
    model: { name: 'gpt-4o' },
    prompt: { ref: { id: 'template-uuid-here' } }
  }
});

// JavaScript - by name/scenario/version
const client = new OrchestrationClient({
  promptTemplating: {
    model: { name: 'gpt-4o' },
    prompt: {
      ref: {
        name: 'my-template',
        scenario: 'customer-support',
        version: '1.0.0'
      }
    }
  }
});
```

```java
// Java - by ID
var prompt = new OrchestrationPrompt()
    .withTemplateRef("template-uuid-here");

// Java - by name/scenario/version
var prompt = new OrchestrationPrompt()
    .withTemplateRef("my-template", "customer-support", "1.0.0");
```

---

## Message History

### JavaScript

```typescript
const response = await client.chatCompletion({
  placeholderValues: { question: 'What is CAP?' },
  messagesHistory: [
    { role: 'user', content: 'I am learning SAP development' },
    { role: 'assistant', content: 'Great! SAP offers many frameworks.' }
  ]
});
```

### Java

```java
var history = List.of(
    OrchestrationMessage.user("I am learning SAP development"),
    OrchestrationMessage.assistant("Great! SAP offers many frameworks.")
);

var prompt = new OrchestrationPrompt("What is CAP?")
    .messageHistory(history);
```

---

## Content Filtering

### Azure Content Safety Filter (JavaScript)

```typescript
import { buildAzureContentSafetyFilter } from '@sap-ai-sdk/orchestration';

const client = new OrchestrationClient({
  promptTemplating: { model: { name: 'gpt-4o' } },
  filtering: {
    input: buildAzureContentSafetyFilter({
      Hate: 'ALLOW_SAFE',
      SelfHarm: 'ALLOW_SAFE',
      Sexual: 'ALLOW_SAFE',
      Violence: 'ALLOW_SAFE'
    }),
    output: buildAzureContentSafetyFilter({
      Hate: 'ALLOW_SAFE_LOW_MEDIUM',
      Violence: 'ALLOW_SAFE'
    })
  }
});

// Filter severity levels:
// ALLOW_SAFE - Only safe content
// ALLOW_SAFE_LOW - Safe + low severity
// ALLOW_SAFE_LOW_MEDIUM - Safe + low + medium
// ALLOW_ALL - No filtering
```

### Prompt Shield (Jailbreak Detection)

```typescript
const client = new OrchestrationClient({
  promptTemplating: { model: { name: 'gpt-4o' } },
  filtering: {
    input: buildAzureContentSafetyFilter({
      promptShield: { detectJailbreakAttempts: true }
    })
  }
});
```

### Llama Guard Filter (JavaScript)

```typescript
import { buildLlamaGuard38BFilter } from '@sap-ai-sdk/orchestration';

const client = new OrchestrationClient({
  promptTemplating: { model: { name: 'gpt-4o' } },
  filtering: {
    input: buildLlamaGuard38BFilter({
      type: 'input',
      enabledCategories: ['violent_crimes', 'hate', 'sexual_content']
    }),
    output: buildLlamaGuard38BFilter({
      type: 'output',
      enabledCategories: ['violent_crimes', 'hate']
    })
  }
});
```

### Java Content Filtering

```java
var config = new OrchestrationModuleConfig()
    .withLlmConfig(OrchestrationAiModel.GPT_4O)
    .withInputFiltering(AzureContentFilter.builder()
        .hate(AzureThreshold.ALLOW_SAFE)
        .selfHarm(AzureThreshold.ALLOW_SAFE)
        .sexual(AzureThreshold.ALLOW_SAFE)
        .violence(AzureThreshold.ALLOW_SAFE)
        .build())
    .withOutputFiltering(AzureContentFilter.builder()
        .hate(AzureThreshold.ALLOW_SAFE_LOW_MEDIUM)
        .build());
```

---

## Data Masking

### JavaScript (SAP DPI)

```typescript
const client = new OrchestrationClient({
  promptTemplating: { model: { name: 'gpt-4o' } },
  masking: {
    masking_providers: [{
      type: 'sap_data_privacy_integration',
      method: 'anonymization', // or 'pseudonymization'
      entities: [
        { type: 'profile-email' },
        { type: 'profile-person' },
        { type: 'profile-phone' },
        { type: 'profile-address' },
        { type: 'profile-org' },
        { type: 'profile-location' }
      ]
    }]
  }
});
```

### Custom Regex Masking

```typescript
const client = new OrchestrationClient({
  promptTemplating: { model: { name: 'gpt-4o' } },
  masking: {
    masking_providers: [{
      type: 'sap_data_privacy_integration',
      method: 'anonymization',
      entities: [
        {
          type: 'custom',
          regex: '\\b[A-Z]{2}\\d{6}\\b', // Custom ID pattern
          replacement: 'REDACTED_ID'
        }
      ]
    }]
  }
});
```

### Java Data Masking

```java
var config = new OrchestrationModuleConfig()
    .withLlmConfig(OrchestrationAiModel.GPT_4O)
    .withMasking(DpiMasking.anonymization()
        .withEntities(
            DpiEntity.EMAIL,
            DpiEntity.PERSON,
            DpiEntity.PHONE,
            DpiEntity.ADDRESS
        ));
```

---

## Document Grounding

### Vector Repository (JavaScript)

```typescript
const client = new OrchestrationClient({
  promptTemplating: {
    model: { name: 'gpt-4o' },
    prompt: [
      { role: 'system', content: 'Answer based on context: {{?context}}' },
      { role: 'user', content: '{{?question}}' }
    ]
  },
  grounding: {
    grounding_input: ['{{?question}}'],
    grounding_output: ['{{?context}}'],
    data_repositories: [{
      type: 'vector',
      id: 'my-vector-repo-id',
      metadata: [{ key: 'category', value: 'technical' }]
    }],
    max_chunks: 5
  }
});
```

### SAP Help Portal Grounding

```typescript
const client = new OrchestrationClient({
  promptTemplating: { model: { name: 'gpt-4o' } },
  grounding: {
    grounding_input: ['{{?question}}'],
    data_repositories: [{
      type: 'help.sap.com',
      configurations: [{ product_url: 'cloud-alm' }]
    }]
  }
});
```

### Java Grounding

```java
var config = new OrchestrationModuleConfig()
    .withLlmConfig(OrchestrationAiModel.GPT_4O)
    .withGrounding(Grounding.create()
        .dataRepository(VectorRepository.create("my-repo-id"))
        .inputVariable("question")
        .outputVariable("context"));
```

---

## Translation

### JavaScript

```typescript
import { buildTranslationConfig } from '@sap-ai-sdk/orchestration';

const client = new OrchestrationClient({
  promptTemplating: { model: { name: 'gpt-4o' } },
  translation: buildTranslationConfig({
    inputLanguage: 'auto', // auto-detect
    outputLanguage: 'en'   // translate output to English
  })
});
```

### Java

```java
var config = new OrchestrationModuleConfig()
    .withLlmConfig(OrchestrationAiModel.GPT_4O)
    .withTranslation("auto", "en"); // input auto-detect, output English
```

---

## Function Calling

### JavaScript

```typescript
const tools = [{
  type: 'function',
  function: {
    name: 'get_weather',
    description: 'Get current weather for a city',
    parameters: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'City name' },
        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] }
      },
      required: ['city']
    }
  }
}];

const response = await client.chatCompletion(
  { placeholderValues: { question: 'Weather in Berlin?' } },
  { tools }
);

const toolCalls = response.getToolCalls();
if (toolCalls?.length) {
  for (const call of toolCalls) {
    console.log('Function:', call.function.name);
    console.log('Arguments:', JSON.parse(call.function.arguments));

    // Execute function and continue conversation
    const result = await executeFunction(call);
    // Send result back to model...
  }
}
```

### Java

```java
var tools = List.of(
    OpenAiTool.builder()
        .function(OpenAiFunction.builder()
            .name("get_weather")
            .description("Get current weather for a city")
            .parameters(Map.of(
                "type", "object",
                "properties", Map.of(
                    "city", Map.of("type", "string"),
                    "unit", Map.of("type", "string", "enum", List.of("celsius", "fahrenheit"))
                ),
                "required", List.of("city")
            ))
            .build())
        .build()
);

var result = client.chatCompletion(prompt, config.withTools(tools));
var toolCalls = result.getToolCalls();
```

---

## Response Formatting

### JSON Schema (JavaScript)

```typescript
const client = new OrchestrationClient({
  promptTemplating: {
    model: { name: 'gpt-4o' },
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'weather_response',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            city: { type: 'string' },
            temperature: { type: 'number' },
            conditions: { type: 'string' }
          },
          required: ['city', 'temperature', 'conditions']
        }
      }
    }
  }
});
```

### Zod Schema (JavaScript)

```typescript
import { z } from 'zod';
import { toJsonSchema } from '@sap-ai-sdk/orchestration';

const WeatherSchema = z.object({
  city: z.string(),
  temperature: z.number(),
  conditions: z.string()
});

const client = new OrchestrationClient({
  promptTemplating: {
    model: { name: 'gpt-4o' },
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'weather_response',
        strict: true,
        schema: toJsonSchema(WeatherSchema)
      }
    }
  }
});
```

### Java Response Format

```java
var config = new OrchestrationModuleConfig()
    .withLlmConfig(OrchestrationAiModel.GPT_4O)
    .withResponseFormat(ResponseFormat.jsonSchema(WeatherResponse.class));

// WeatherResponse class with @JsonProperty annotations
public record WeatherResponse(
    @JsonProperty(required = true) String city,
    @JsonProperty(required = true) double temperature,
    @JsonProperty(required = true) String conditions
) {}
```

---

## Image Recognition

### JavaScript

```typescript
// URL-based image
const response = await client.chatCompletion({
  placeholderValues: { question: 'Describe this image' },
  messagesHistory: [{
    role: 'user',
    content: [
      { type: 'text', text: 'What is in this image?' },
      {
        type: 'image_url',
        image_url: {
          url: 'https://example.com/image.jpg',
          detail: 'auto' // 'auto', 'low', or 'high'
        }
      }
    ]
  }]
});

// Base64 encoded image
const imageData = fs.readFileSync('image.jpg').toString('base64');
const response = await client.chatCompletion({
  messagesHistory: [{
    role: 'user',
    content: [
      { type: 'text', text: 'Describe this image' },
      {
        type: 'image_url',
        image_url: { url: `data:image/jpeg;base64,${imageData}` }
      }
    ]
  }]
});
```

### Java

```java
var prompt = new OrchestrationPrompt()
    .addUserMessage(ImageMessage.create(
        "What is in this image?",
        "https://example.com/image.jpg",
        ImageDetail.AUTO
    ));
```

---

## Embedding

### JavaScript (v2.2.0+)

```typescript
import { OrchestrationEmbeddingClient } from '@sap-ai-sdk/orchestration';

const client = new OrchestrationEmbeddingClient({
  embeddings: {
    model: { name: 'text-embedding-3-large' }
  }
});

// Single text
const response = await client.embed({ input: 'SAP is an enterprise software company' });
const embedding = response.getEmbeddings()[0];

// Batch embedding
const response = await client.embed({
  input: ['First text', 'Second text', 'Third text']
});
const embeddings = response.getEmbeddings();
```

### Java (v1.11.0+)

```java
var request = OrchestrationEmbeddingRequest
    .forModel(OrchestrationAiModel.TEXT_EMBEDDING_3_SMALL)
    .forInputs("SAP is an enterprise software company")
    .asDocument();

var response = client.embed(request);
float[] embedding = response.getEmbeddingVectors().get(0);
```

---

## Custom Configuration

### Resource Group

```typescript
// JavaScript
const client = new OrchestrationClient(config, {
  resourceGroup: 'my-custom-group'
});
```

```java
// Java
var service = new AiCoreService()
    .getInferenceDestination("my-custom-group");
var client = new OrchestrationClient(service);
```

### Deployment ID

```typescript
// JavaScript
const client = new OrchestrationClient(config, {
  deploymentId: 'd1234567'
});
```

### Custom Destination

```typescript
// JavaScript
const client = new OrchestrationClient(config, {
  destinationName: 'my-aicore-destination',
  useCache: false // disable destination caching
});
```

### Load from AI Launchpad JSON

```typescript
// JavaScript - from file
const client = await OrchestrationClient.fromJsonConfig('config.json');

// JavaScript - from string
const jsonString = fs.readFileSync('config.json', 'utf-8');
const client = OrchestrationClient.fromJsonConfigString(jsonString);
```

```java
// Java
var client = OrchestrationClient.fromJsonConfig(
    new File("config.json")
);
```

---

## Documentation Links

- JS Orchestration: https://github.com/SAP/ai-sdk/tree/main/docs-js/orchestration
- Java Orchestration: https://github.com/SAP/ai-sdk/tree/main/docs-java/orchestration
