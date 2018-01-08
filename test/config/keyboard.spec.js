describe('Keyboard', () => {
    it('should get a key binding', () => {
        let config = require("../../config/default/keyboard.js");
        let filtered = config.filter((key, index) => {
            return key.key == "ctrl+shift+enter" && key.when({inQueryEditor: true});
        });

        expect(filtered.length).toBe(1);
    });
});
  