# Cloudflare MCP Server

Model Context Protocol (MCP) is a [new, standardized protocol](https://modelcontextprotocol.io/introduction) for managing context between large language models (LLMs) and external systems. In this repository, you can find several MCP servers allowing you to connect to Cloudflare's service from an MCP client (e.g. Cursor, Claude) and use natural language to accomplish tasks through your Cloudflare account.

These MCP servers allow your [MCP Client](https://modelcontextprotocol.io/clients) to read configurations from your account, process information, make suggestions based on data, and even make those suggested changes for you. All of these actions can happen across cloudflare's many services including application development, security and performance.

The following servers are included in this repository:

| Server Name                                                    | Description                                                                                     | Server URL                                     |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [**Documentation server**](/apps/docs-vectorize)               | Get up to date reference information on Cloudflare                                              | `https://docs.mcp.cloudflare.com/sse`          |
| [**Workers Bindings server**](/apps/workers-bindings)          | Build Workers applications with storage, AI, and compute primitives                             | `https://bindings.mcp.cloudflare.com/sse`      |
| [**Observability server**](/apps/workers-observability)        | Debug and get insight into your application’s logs and analytics                                | `https://observability.mcp.cloudflare.com/sse` |
| [**Radar server**](/apps/radar)                                | Get global Internet traffic insights, trends, URL scans, and other utilities                    | `https://radar.mcp.cloudflare.com/sse`         |
| [**Container server**](/apps/sandbox-container)                | Spin up a sandbox development environment                                                       | `https://containers.mcp.cloudflare.com/sse`    |
| [**Browser rendering server**](/apps/browser-rendering)        | Fetch web pages, convert them to markdown and take screenshots                                  | `https://browser.mcp.cloudflare.com/sse`       |
| [**Logpush server**](/apps/logpush)                            | Get quick summaries for Logpush job health                                                      | `https://logs.mcp.cloudflare.com/sse`          |
| [**AI Gateway server**](/apps/ai-gateway)                      | Search your logs, get details about the prompts and responses                                   | `https://ai-gateway.mcp.cloudflare.com/sse`    |
| [**AutoRAG server**](/apps/autorag)                            | List and search documents on your AutoRAGs                                                      | `https://autorag.mcp.cloudflare.com/sse`       |
| [**Audit Logs server**](/apps/auditlogs)                       | Query audit logs and generate reports for review                                                | `https://auditlogs.mcp.cloudflare.com/sse`     |
| [**DNS Analytics server**](/apps/dns-analytics)                | Optimize DNS performance and debug issues based on current set up                               | `https://dns-analytics.mcp.cloudflare.com/sse` |
| [**Digital Experience Monitoring server**](/apps/dex-analysis) | Get quick insight on critical applications for your organization                                | `https://dex.mcp.cloudflare.com/sse`           |
| [**Cloudflare One CASB server**](/apps/cloudflare-one-casb)    | Quickly identify any security misconfigurations for SaaS applications to safeguard users & data | `https://casb.mcp.cloudflare.com/sse`          |

## Access the remote MCP server from any MCP client

If your MCP client has first class support for remote MCP servers, the client will provide a way to accept the server URL directly within its interface (e.g. [Cloudflare AI Playground](https://playground.ai.cloudflare.com/))

If your client does not yet support remote MCP servers, you will need to set up its resepective configuration file using mcp-remote (https://www.npmjs.com/package/mcp-remote) to specify which servers your client can access.

```json
{
	"mcpServers": {
		"cloudflare-observability": {
			"command": "npx",
			"args": ["mcp-remote", "https://observability.mcp.cloudflare.com/sse"]
		},
		"cloudflare-bindings": {
			"command": "npx",
			"args": ["mcp-remote", "https://bindings.mcp.cloudflare.com/sse"]
		}
	}
}
```

## Need access to more Cloudflare tools?

We're continuing to add more functionality to this remote MCP server repo. If you'd like to leave feedback, file a bug or provide a feature request, [please open an issue](https://github.com/cloudflare/mcp-server-cloudflare/issues/new/choose) on this repository

## Troubleshooting

"Claude's response was interrupted ... "

If you see this message, Claude likely hit its context-length limit and stopped mid-reply. This happens most often on servers that trigger many chained tool calls such as the observability server.

To reduce the chance of running in to this issue:

- Try to be specific, keep your queries concise.
- If a single request calls multiple tools, try to to break it into several smaller tool calls to keep the responses short.

## Paid Features

Some features may require a paid Cloudflare Workers plan. Ensure your Cloudflare account has the necessary subscription level for the features you intend to use.

## Contributing

Interested in contributing, and running this server locally? See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.
