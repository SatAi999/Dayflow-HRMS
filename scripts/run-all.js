import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');

const runService = (name, dir, command, args) => {
  console.log(`[Dayflow launcher] Starting ${name} in ${dir}...`);
  const process = spawn(command, args, {
    cwd: path.join(rootDir, dir),
    shell: true,
    stdio: 'inherit'
  });

  process.on('close', (code) => {
    console.log(`[Dayflow launcher] ${name} process exited with code ${code}`);
  });

  return process;
};

// Launch applications
const backend = runService('Backend Server', 'backend', 'npm', ['run', 'dev']);
const frontend = runService('Frontend Client', 'frontend', 'npm', ['run', 'dev']);

process.on('SIGINT', () => {
  console.log('[Dayflow launcher] Shutting down services...');
  backend.kill();
  frontend.kill();
  process.exit();
});
