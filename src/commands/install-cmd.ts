import { InstallFlags } from '../types';
import { getAliasedGlobalFlags } from './helm-cmd';
import { runCommand, buildFlagsString } from '../utils/helpers';

const buildHelmInstallCmd = (name:string, chart: string, flags: InstallFlags = {}) => {
  const allFlags = {
    ...getAliasedGlobalFlags(flags),
  };
  const flagsString = buildFlagsString(allFlags);
  return `helm install ${name} ${chart} ${flagsString}`;
};

/**
 * This command installs a chart archive.
 * The install argument must be a chart reference,
 * a path to a packaged chart, a path to an unpacked chart directory or a URL.
 *
 * @param name name
 * @param chart chart
 * @param flags flags
 */
const install = async (name: string, chart: string, flags: InstallFlags = {}): Promise<Release> => {
  const command = buildHelmInstallCmd(name, chart, flags);
  const stdout = await runCommand(command);
  return JSON.parse(stdout);
};

export default install;
