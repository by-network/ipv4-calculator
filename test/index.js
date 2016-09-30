import 'babel-polyfill';
import { expect } from 'chai';

import {
  getNetworkFirstIp,
  getNetworkBroadcastIp,
  getNetworkIps,
} from '../src';

describe('IPv4 calculator', () => {
  describe('get network first IP', () => {
    it('should be a function', () => {
      expect(getNetworkFirstIp).to.be.a('function');
    });

    it('should throw error if network is invalid', () => {
      expect(getNetworkFirstIp.bind(null, 'x.x.x.x/yy')).to.throw(Error);
    });

    it('should return first IP address of the network', () => {
      expect(getNetworkFirstIp('192.168.0.29/16')).to.equal('192.168.0.0');
      expect(getNetworkFirstIp('192.210.0.11/30')).to.equal('192.210.0.8');
    });
  });

  describe('get network broadcast IP', () => {
    it('should be a function', () => {
      expect(getNetworkBroadcastIp).to.be.a('function');
    });

    it('should throw error if network is invalid', () => {
      expect(getNetworkBroadcastIp.bind(null, 'x.x.x.x/yy')).to.throw(Error);
    });

    it('should return broadcast IP address of the network', () => {
      expect(getNetworkBroadcastIp('192.210.0.25/28')).to.equal('192.210.0.31');
      expect(getNetworkBroadcastIp('10.20.30.40/23')).to.equal('10.20.31.255');
    });
  });

  describe('get network IPs list', () => {
    it('should be a function', () => {
      expect(getNetworkIps).to.be.a('function');
    });

    it('should throw error if network is invalid', () => {
      expect(getNetworkIps.bind(null, 'x.x.x.x/yy')).to.throw(Error);
    });

    it('should return full IPs list of network', () => {
      const list1 = getNetworkIps('192.210.0.25/30');
      expect(list1).to.eql([
        '192.210.0.24',
        '192.210.0.25',
        '192.210.0.26',
        '192.210.0.27',
      ]);

      const list2 = getNetworkIps('10.20.30.40/23');
      expect(list2.length).to.equal(512);
    });
  });
});