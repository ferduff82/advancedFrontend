import * as uuid from 'device-uuid';

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export function getDeviceId() {
  var du = new uuid.DeviceUUID().parse();
          var dua = [
              du.language,
              du.version,
              du.platform,
              du.os,
              du.cpuCores,
              du.isAuthoritative,
              du.silkAccelerated,
              du.isKindleFire,
              du.isDesktop,
              du.isMobile,
              du.isTablet,
              du.isWindows,
              du.isLinux,
              du.isLinux64,
              du.isMac,
              du.isiPad,
              du.isiPhone,
              du.isiPod,
              du.isSmartTV,
              du.pixelDepth,
              du.isTouchScreen
          ];
          var deviceID = du.hashMD5(dua.join(':'))
          return deviceID
  }