// path/to/lsif-go.ts

import { execSync } from 'child_process';

/**
 * Generates LSIF data using the Sourcegraph CLI.
 */
export function generateLSIFData(): void {
  try {
    execSync('src code-intel generate');
    console.log('LSIF data generated successfully.');
  } catch (error) {
    console.error('Failed to generate LSIF data:', error);
  }
}

// Run the LSIF data generation process
generateLSIFData();
