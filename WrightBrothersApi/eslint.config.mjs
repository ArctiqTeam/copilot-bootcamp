import globals from "globals";
import tseslint from "typescript-eslint";


export default [
    // Apply these settings to all JavaScript and TypeScript files
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    
    // Define global variables available in the browser environment
    { languageOptions: { globals: globals.browser } },
    
    // Include recommended TypeScript ESLint rules
    ...tseslint.configs.recommended,
    
    {
        rules: {
            // Enforce naming conventions
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    // Variables should be in camelCase, leading underscores are allowed
                    "selector": "variableLike",
                    "format": ["camelCase"],
                    "leadingUnderscore": "allow"
                },
                {
                    // Types (classes, interfaces, etc.) should be in PascalCase
                    "selector": "typeLike",
                    "format": ["PascalCase"]
                },
                {
                    // Functions should be in camelCase
                    "selector": "function",
                    "format": ["camelCase"]
                },
                {
                    // Classes should be in PascalCase
                    "selector": "class",
                    "format": ["PascalCase"]
                },
                {
                    // Interfaces should be in PascalCase and start with "I"
                    "selector": "interface",
                    "format": ["PascalCase"],
                    "custom": {
                        "regex": "^I[A-Z]",
                        "match": true
                    }
                },
                {
                    // Enums should be in PascalCase
                    "selector": "enum",
                    "format": ["PascalCase"]
                }
            ],
            
            // Enforce 4-space indentation
            "indent": ["error", 4],
            
            // Enforce the use of semicolons
            "semi": ["error", "always"],
            
            // Disallow trailing commas
            "comma-dangle": ["error", "never"],
            
            // Disallow trailing whitespace
            "no-trailing-spaces": "error",
            
            // Enforce a newline at the end of files
            "eol-last": ["error", "always"],
            
            // Disallow unused variables
            "no-unused-vars": "error",
            
            // Prefer const over let where possible
            "prefer-const": "error",
            
            // Enforce consistent spacing inside braces
            "object-curly-spacing": ["error", "always"],
            
            // Disallow spaces inside array brackets
            "array-bracket-spacing": ["error", "never"]
        }
    }
];
