/* eslint-disable no-undef */
import { runCommand, buildFlagsString } from '../../src/utils/helpers';

describe('helpers', () => {
  describe('buildFlagsString', () => {
    it('returns correct boolean flag', () => {
      const flagsString = buildFlagsString({
        '--all-namespaces': true,
      });
      expect(flagsString).toBe('--all-namespaces');
    });
    it('returns a correct string flag', () => {
      const flagsString = buildFlagsString({
        '--namespace': 'my-namespace',
      });
      expect(flagsString).toBe('--namespace=my-namespace');
    });
    it('returns correct flags with boolean and string flags', () => {
      const flagsString = buildFlagsString({
        '--all-namespaces': true,
        '--namespace': 'my-namespace',
      });
      expect(flagsString).toBe('--all-namespaces --namespace=my-namespace');
    });
    it('ignores false boolean flags', () => {
      const flagsString = buildFlagsString({
        '--all-namespaces': false,
        '--namespace': 'my-namespace',
      });
      expect(flagsString).toBe('--namespace=my-namespace');
    });
    it('ignores all falsey flags', () => {
      const flagsString = buildFlagsString({
        '--all-namespaces': false,
        '--namespace': '',
      });
      expect(flagsString).toBe('');
    });
  });
  describe('runCommand', () => {
    it('throws an error on stderr', async () => {
      await expect(runCommand('echo this is an err > /dev/stderr')).rejects.toThrow('this is an err');
    });
    it('returns stdout', async () => {
      await expect(runCommand('echo lemon')).resolves.toEqual('lemon\n');
    });
  });
});
