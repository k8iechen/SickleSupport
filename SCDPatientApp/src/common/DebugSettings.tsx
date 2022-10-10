export default (() => {
  try {
    const result = require("./DebugSettings.data.tsx").default;
    return result
  } catch (e) {
  }
  return {};
})();
