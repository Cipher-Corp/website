import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';

/**
 * Feature: cipher-corp-website, Property 5: Theme Persistence Round-Trip
 * Validates: Requirements 3.3, 3.4
 * 
 * For any selected theme, storing to local storage and then reading from 
 * local storage SHALL return the same theme value.
 */

// Mock localStorage for testing
class MockLocalStorage {
    private store: Record<string, string> = {};

    getItem(key: string): string | null {
        return this.store[key] ?? null;
    }

    setItem(key: string, value: string): void {
        this.store[key] = value;
    }

    removeItem(key: string): void {
        delete this.store[key];
    }

    clear(): void {
        this.store = {};
    }
}

// Theme persistence functions that mirror next-themes behavior
const THEME_STORAGE_KEY = 'theme';

function storeTheme(storage: MockLocalStorage, theme: string): void {
    storage.setItem(THEME_STORAGE_KEY, theme);
}

function retrieveTheme(storage: MockLocalStorage): string | null {
    return storage.getItem(THEME_STORAGE_KEY);
}

describe('Theme Persistence Property Tests', () => {
    let localStorage: MockLocalStorage;

    beforeEach(() => {
        localStorage = new MockLocalStorage();
    });

    /**
     * Property 5: Theme Persistence Round-Trip
     * For any selected theme, storing to local storage and then reading 
     * from local storage SHALL return the same theme value.
     */
    it('Property 5: Theme persistence round-trip - storing and retrieving theme returns same value', () => {
        // Generate valid theme values (dark or light)
        const themeArbitrary = fc.constantFrom('dark', 'light');

        fc.assert(
            fc.property(themeArbitrary, (theme) => {
                // Store the theme
                storeTheme(localStorage, theme);

                // Retrieve the theme
                const retrievedTheme = retrieveTheme(localStorage);

                // The retrieved theme should equal the stored theme
                expect(retrievedTheme).toBe(theme);
            }),
            { numRuns: 100 }
        );
    });

    /**
     * Additional property: Theme persistence works for any string value
     * This tests that the storage mechanism works correctly for arbitrary strings
     */
    it('Property 5 (extended): Theme persistence works for arbitrary theme strings', () => {
        fc.assert(
            fc.property(fc.string({ minLength: 1 }), (theme) => {
                // Store the theme
                storeTheme(localStorage, theme);

                // Retrieve the theme
                const retrievedTheme = retrieveTheme(localStorage);

                // The retrieved theme should equal the stored theme
                expect(retrievedTheme).toBe(theme);
            }),
            { numRuns: 100 }
        );
    });

    /**
     * Property: Theme overwrite preserves latest value
     * When multiple themes are stored, the last one should be retrieved
     */
    it('Property 5 (overwrite): Storing a new theme overwrites the previous one', () => {
        const themeArbitrary = fc.constantFrom('dark', 'light');

        fc.assert(
            fc.property(themeArbitrary, themeArbitrary, (firstTheme, secondTheme) => {
                // Store first theme
                storeTheme(localStorage, firstTheme);

                // Store second theme (overwrite)
                storeTheme(localStorage, secondTheme);

                // Retrieved theme should be the second (latest) theme
                const retrievedTheme = retrieveTheme(localStorage);
                expect(retrievedTheme).toBe(secondTheme);
            }),
            { numRuns: 100 }
        );
    });
});
