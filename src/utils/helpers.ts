import { promisify } from 'util';
import childProcess from 'child_process';

const exec = promisify(childProcess.exec);

/**
 * A wrapper around the built-in exec that will throw an exception if anything is printed to stderr
 * @param command command to execute
 */
export const runCommand = async (command: string) => {
  const { stdout, stderr } = await exec(command);
  if (stderr) {
    throw new Error(stderr);
  }
  return stdout;
};

/**
 * e.g.
 * from:
 * {
 *    '--all-namespaces': false, // if false, flag is omitted
 *    '--namespace': 'my-namespace' // if empty string, flag is omitted
 * }
 * to:
 * '--all-namespaces --namespace=my-namespace'
 */
export const buildFlagsString = (flags: object) => {
  let flagsString = '';
  Object.entries(flags).forEach(([key, value]) => {
    if (typeof value === 'boolean') {
      flagsString += value === false ? '' : ` ${key}`;
    } else if (typeof value === 'string') {
      flagsString += value.length === 0 ? '' : ` ${key}=${value}`;
    }
  });
  return flagsString.trim();
};
