/**
 * Default agents configuration for all stream.submit calls
 * This configuration enables all available agents by default
 */
export const DEFAULT_AGENTS_CONFIG = {
  configurable: {
    agents: {
      code_interpreter_agent: true,
      search_agent: true,
      summarize_agent: true,
      x_twitter_agent: true,
      mermaid_agent: true,
      create_image_agent: true,
      map_agent: true,
      artifacts_agent: true
    }
  }
} as const;

/**
 * Helper function to merge custom config with default agents config
 * @param customConfig - Custom configuration to merge
 * @returns Merged configuration with default agents
 */
export function withDefaultAgentsConfig(customConfig: any = {}) {
  return {
    ...customConfig,
    config: {
      ...customConfig.config,
      ...DEFAULT_AGENTS_CONFIG,
      configurable: {
        ...customConfig.config?.configurable,
        ...DEFAULT_AGENTS_CONFIG.configurable,
        agents: {
          ...DEFAULT_AGENTS_CONFIG.configurable.agents,
          ...customConfig.config?.configurable?.agents
        }
      }
    }
  };
}
