
export enum HookEvents {
  INIT = 'init',
  APP_INIT = 'app:init',
  APP_ADD = 'app:add',
  APP_UNMOUNT = 'app:unmount',
  COMPONENT_UPDATED = 'component:updated',
  COMPONENT_ADDED = 'component:added',
  COMPONENT_REMOVED = 'component:removed',
  COMPONENT_EMIT = 'component:emit',
  COMPONENT_HIGHLIGHT = 'component:highlight',
  COMPONENT_UNHIGHLIGHT = 'component:unhighlight',
  SETUP_DEVTOOLS_PLUGIN = 'devtools-plugin:setup',
  TIMELINE_LAYER_ADDED = 'timeline:layer-added',
  TIMELINE_EVENT_ADDED = 'timeline:event-added',
  CUSTOM_INSPECTOR_ADD = 'custom-inspector:add',
  CUSTOM_INSPECTOR_SEND_TREE = 'custom-inspector:send-tree',
  CUSTOM_INSPECTOR_SEND_STATE = 'custom-inspector:send-state',
  CUSTOM_INSPECTOR_SELECT_NODE = 'custom-inspector:select-node',
  PERFORMANCE_START = 'perf:start',
  PERFORMANCE_END = 'perf:end',
  PLUGIN_SETTINGS_SET = 'plugin:settings:set',
  /**
   * @deprecated
   */
  FLUSH = 'flush',
  /**
   * @deprecated
   */
  TRACK_UPDATE = '_track-update',
  /**
   * @deprecated
   */
  FLASH_UPDATE = '_flash-update',
}
