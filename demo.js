const { AppMain } = require("@/layout/components");

let z = {
  height: app.globalData.height * 2 + 20, //页面高度
  h: app.globalData.height,
  system: app.globalData.system,
  system: "", //系统类型android,iso

  flag: false,
  AdapterState: false, //蓝牙适配器状态
  logs: [],
  list: [],
  iosList: [],
  searchTextValue: "",
  scan: false,
  searchTime: "",
  scanState: true, //扫描状态 是否在扫描
  searchText: true,
  tsText: "",
  bleState: true, //蓝牙模块状态【默认为正常】
  init: false, //页面是否已经初始化
};
//获取设备信息
wx.getSystemInfo({
  success: (res) => {
    res.system = res.system.split(" ")[0]; //android
    that.setData({
      system: res.system,
    });
  },
});

that.setData({
  list: [],
});

if (that.data.AdapterState) {
  //   that.searchBt();
  //开始扫描附近设备
  wx.startBluetoothDevicesDiscovery({
    services: ["00001812-0000-1000-8000-00805F9B34FB"], // 如果填写了此UUID，那么只会搜索出含有这个UUID的设备
    success: function (res) {
      that.setData({
        searchTextValue: "正在搜索附近设备...",
      });
      //搜索60s后关闭搜索
      that.setData({
        searchTime: setTimeout(function () {
          wx.stopBluetoothDevicesDiscovery({
            success(res) {
              console.log("关闭搜索");
              that.setData({
                searchTextValue: "搜索完成",
              });
              if (that.data.list.length == 0) {
                that.setData({
                  state: "未发现设备,可能是未打开定位或未授权引起",
                  scanState: false,
                  searchTextValue: "",
                });
              }
            },
          });
        }, 60000),
      });
    },
    fail: function (res) {
      // fail
      console.log(res);
    },
    complete: function (res) {
      // complete
      console.log(res);
    },
  });
} else {
  //初始化蓝牙适配器
  wx.openBluetoothAdapter({
    success: () => {
      console.log("进来搜索啦");
      that.searchBt();
      that.setData({
        AdapterState: true,
      });
    },
    fail: (err) => {
      that.setData({
        tsText: "请打开手机蓝牙",
        bleState: false,
      });
    },
  });
}
//监听蓝牙状态（是否发生断开或恢复）
wx.onBluetoothAdapterStateChange((res) => {
  if (res.available) {
    //蓝牙适配器可用
    if (that.data.bleState == false) {
      //蓝牙断开重新连接
      wx.openBluetoothAdapter({
        success: (res) => {
          that.searchBt();
          that.setData({
            tsText: "",
            searchTextValue: "正在搜索附近设备...",
            bleState: true,
          });
        },
      });
    }
  } else {
    //蓝牙已关闭
    that.setData({
      searchTextValue: "蓝牙连接已断开,停止搜索",
      bleState: false,
    });
    //蓝牙断开则关闭搜索
    clearInterval(that.data.searchTime);
  }
});
//abcdefg 2
let jiequ = function (str, n) {
  var strArr = [];

  for (var i = 0, l = str.length; i < l / n; i++) {
    var a = str.slice(n * i, n * (i + 1)); //2*0,2;
    strArr.push(a.toUpperCase());
  }
  let s = strArr.join(":");
  // return s;
};
//
let ab2hex = function (buffer) {
  var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ("00" + bit.toString(16)).slice(-2);
  });
  return hexArr.join("");
};
//
wx.getBluetoothDevices({
  success: function (res) {
    console.log("获取在蓝牙模块生效期间所有已发现的蓝牙设备");
    if (that.data.system == "iOS") {
      for (let i = 0; i < res.devices.length; i++) {
        res.devices[i].IosdeviceId = that.jiequ(
          that.ab2hex(res.devices[i].advertisData),
          2
        );
        if (res.devices[i].name == "KRemote") {
          // that.data.list.push(res.devices[i])
          that.setData({
            list: that.data.list.push(res.devices[i]),
          });
        }
      }
      if (that.data.list.length != 0) {
        that.setData({
          scan: true,
          searchText: false,
        });
      }
    } else {
      for (let i = 0; i < res.devices.length; i++) {
        if (res.devices[i].name == "kHID") {
          that.setData({
            list: that.data.list.push(res.devices[i]),
          });
        }
      }
      if (that.data.list.length != 0) {
        that.setData({
          scan: true,
          searchText: false,
        });
      }
    }
  },
  fail: function (res) {
    // fail
  },
  complete: function (res) {
    // complete
  },
});
//
// 获取搜索中新增蓝牙设备
wx.onBluetoothDeviceFound(function (obj) {
  console.log("获取搜索中新增蓝牙设备");
  var temp = that.data.list;
  obj.devices.map((dev) => {
    let pDev = temp.find((it) => {
      return it.deviceId == dev.deviceId;
    });

    if (!pDev && (dev.name == "KRemote" || dev.name == "kHID")) {
      if ((that.data.system = "iOS")) {
        dev.IosdeviceId = that.jiequ(that.ab2hex(dev.advertisData), 2);
      }
      temp.push(dev);
      that.setData({
        list: temp,
      });
      console.log(that.data.list);
    }
  });
  if (temp.length != 0) {
    that.setData({
      scan: true,
      searchText: false,
      list: temp,
    });
  }
});
setTimeout(() => {
  that.setData({
    list: that.data.list.sort(that.compare("RSSI")),
  });
}, 5000);

//
let data = [];
if (wx.getStorageSync("deviceId") == "") {
  wx.setStorageSync("deviceName", e.name);
  wx.setStorageSync("deviceId", e.deviceId); // 保存mac地址到本地
  wx.setStorageSync("IOSID", e.IosId);
  wx.setStorageSync("logDataList", data);
}
that.setData({
  deviceId: wx.getStorageSync("deviceId"),
  deviceName: e.name,
  flag: 2,
});
setTimeout(() => {
  wx.openBluetoothAdapter({
    success: function () {
      that.connect();
    },
    fail: function (err) {
      wx.showToast({
        title: "请打开手机蓝牙",
        icon: "none",
        duration: 2000,
      });
      that.setData({
        flag: 1,
      });
      // that.showPopup()
    },
  });
}, 1000);
//
// 连接ble
let connect = function () {
  var deviceId = wx.getStorageSync('deviceId')
  that.setData({
    connecting: true,
    clickCount: 0
  })
  setTimeout(function () {
    wx.createBLEConnection({
      deviceId: deviceId,
      success: function () {
        wx.setStorageSync('BleCon', true)
        //连接成功后开启连接监听
        wx.onBLEConnectionStateChanged(function (res) {
          wx.setStorageSync('BleCon', res.connected)
          //蓝牙断开
          if (res.connected == false) {
            //断线关闭当前蓝牙模块 点击重新连接时开启
            setTimeout(() => { //监听到蓝牙连接断开 跳转到首页 
              wx.closeBluetoothAdapter({
                success: (res) => {
                  wx.showToast({
                    title: '蓝牙连接已断开',
                    icon: 'none',
                    duration: 1000
                  })
                  that.showPopup()
                  that.setData({
                    flag: 1,
                    BleCon: false,
                    dl: '',
                    a: false,
                    b: false,
                    c: false,
                    batteryVal: 100,
                    connecting: false,
                    upversionBox: true,
                    upversionBox2: true,
                  })
                },
              })
            }, 100)

          } else {
            that.setData({
              BleCon: true,
              connecting: true
            })
          }
        })

        //获取设备服务列表
        wx.getBLEDeviceServices({
          deviceId: deviceId,
          success: function (e) {
            var uuid;
            if (that.data.system == "iOS") {
              e.services.forEach((item) => {
                if (item.uuid == '000000FB-0000-1000-8000-00805F9B34FB') {
                  uuid = item.uuid
                }
              })
            } else {
              e.services.forEach((item) => {
                if (item.uuid == '000000FB-0000-1000-8000-00805F9B34FB') {
                  uuid = item.uuid
                }
              })
            }
            that.setData({
              serviceId: uuid
            });
            wx.setStorageSync('serviceId', uuid)
            //延迟三秒，根据服务获取特征
            setTimeout(function () {
              wx.getBLEDeviceCharacteristics({
                deviceId: deviceId,
                serviceId: that.data.serviceId,
                success: function (res) {
                  console.log('获取特征值成功');
                  that.setData({
                    characteristicId: res.characteristics[1].uuid
                  })
                }
              })
              //开启设备特征notify
              setTimeout(() => {
                that.notify();
              }, 500)
            }, 1000)
          }
        })
      },
      fail: function (e) {
        if (e.errCode == 10003) {
          console.log("10003----重新连接");
          that.connect()
        } else {
          console.log("非10003连接失败")
          wx.showToast({
            title: '请打开或靠近设备重新连接',
            icon: 'none',
            duration: 2000,
          })
          that.showPopup()
          //连接失败时改变flag状态 弹出连接失败框
          that.setData({
            flag: 1,
            connecting: false
          })
        }
      },
      complete: function () { }
    })
  }, 1000)
}
//
//开启特征监听
let notify = function () {
  wx.notifyBLECharacteristicValueChange({
    characteristicId: "00001002-0000-1000-8000-00805F9B34FB",
    deviceId: that.data.deviceId,
    serviceId: that.data.serviceId,
    state: true,
    success: (res) => {
      var timestamp = Date.parse(new Date());
      timestamp = (timestamp / 1000).toString(16)
      var hex = 'DB0402' + timestamp
      that.setData({
        BleCon: true
      })
      setTimeout(() => {
        that.writeBle(that.data.deviceId, that.data.serviceId, hex) //获取状态
        setTimeout(() => {
          that.writeBle(that.data.deviceId, that.data.serviceId, 'DB0105') //获取历史记录
          setTimeout(() => {
            that.writeBle(that.data.deviceId, that.data.serviceId, 'DB0107') //查询自定义消杀列表
            setTimeout(() => {
              that.writeBle(that.data.deviceId, that.data.serviceId, 'DB01A4') //获取版本号
              setTimeout(() => {
                !that.data.b ? that.writeBle(that.data.deviceId, that.data.serviceId, 'DB0105') : ''
                !that.data.c ? that.writeBle(that.data.deviceId, that.data.serviceId, 'DB0107') : ''
                !that.data.d ? that.writeBle(that.data.deviceId, that.data.serviceId, 'DB01A4') : ''
                if (!that.data.a) {
                  //毫秒数
                  let timestamp = Date.parse(new Date());
                  timestamp = (timestamp / 1000).toString(16)
                  let hex = 'DB0402' + timestamp
                  that.writeBle(that.data.deviceId, that.data.serviceId, hex)
                }
                setTimeout(() => {
                  if (!that.data.a || !that.data.b || !that.data.c || !that.data.d) {
                    wx.closeBLEConnection({
                      deviceId: that.data.deviceId,
                    })
                  } else {
                    wx.getStorage({
                      key: 'Version',
                      success: function (e) {
                        let versiondata = {
                          "mac": that.data.deviceId,
                          "version": e.data,
                          "system_info": that.data.SystemInfo
                        }
                        request.Get('/wx_mini/v1/hilinkdevice/mac_version_log', versiondata, (res) => { })
                      }
                    })
                  }
                }, 10000);
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000);
      wx.onBLECharacteristicValueChange(function (characteristic) {
        console.log('特征值变化:' + that.buf2hex(characteristic.value))
        var instructions = that.buf2hex(characteristic.value).substring(0, 6)
        if (instructions == 'bd06a2') {//版本号
          let version = Number(that.buf2hex(characteristic.value).substring(15, 16) + that.buf2hex(characteristic.value).substring(17, 18))
          that.setData({
            nowVersion: version,
            d: true1
          })
          wx.setStorageSync('Version', version)
          // let versiondata = {
          //   "mac": that.data.deviceId,
          //   "version":version,
          //   "system_info":that.data.SystemInfo
          // }
          let getFileData = {
            "version_now": version,
            "product_code": "disinfect_box",
            "soft_type": "1"
          }
          request.Get('/wx_mini/v1/hilinkdevice/query_update_soft', getFileData, (res) => {
            if (res.code == 200) {
              if (res.data.is_must === 1) {
                that.setData({
                  mustUp: true,
                  otapath: res.data.path,
                  newVersion: res.data.version,
                  versionDesc: res.data.notice,
                  upversionBox2: false
                })
              }
              that.setData({
                isUpVersion: true,
              })
            } else {
              that.setData({
                isUpVersion: false,
              })
            }
          })
        } else if (instructions == 'bd0e02') {
          that.setData({
            result: that.arrayBufferToString(characteristic.value),
            resStr: that.buf2hex(characteristic.value),
            time: '-- --',
            nextTime: '',
            a: true
          })
          //消杀中
          if (that.data.result[3] == '1') {
            clearInterval(that.data.timeInterval)
            var time = that.data.resStr;
            var s = time.substring(8, 12)
            var hs = time.substring(12, 16)
            //开始消杀时间 = 当前已消杀时间 + 当前时间戳
            var t = that.hex2int(s) - that.hex2int(hs);
            that.setData({
              timeInterval: setInterval(function () {
                t--;
                if (t >= 0) {
                  that.setData({
                    time: that.s_to_hs(t)
                  })
                }
              }, 1000),
              flag: 4
            })
          } else {
            //不在消杀中
            var time = that.data.resStr;
            var nextTime = time.substring(18, 26)
            var nextT = Number(that.hex2int(nextTime))
            that.setData({
              nextTime: that.formatDate(nextT).split(" ")[1],
              flag: 3,
            })
          }
          var dl = (that.data.dlVal != 0 && that.data.dlVal >= that.hex2int(that.data.resStr.substring(16, 18))) ? that.data.dlVal : that.hex2int(that.data.resStr.substring(16, 18))
          //电池电量  
          that.setData({
            dlVal: dl,
            dl: dl + '%',
            batteryVal: dl
          })
        } else if (instructions == 'bd0805' || instructions == 'bd0806') {
          that.setData({
            result: that.arrayBufferToString(characteristic.value),
            resStr: that.buf2hex(characteristic.value),
            b: true
          })
          let startTime = that.formatDate(that.hex2int(that.data.resStr.substring(6, 14)))
          let timing = String(that.hex2int(that.data.resStr.substring(14, 18)))
          let type = Number(that.hex2int(that.data.resStr.substring(18, 20)))
          let nextList = that.hex2int(that.data.resStr.substring(20, 22))
          //蓝牙有链接 并且有记录返回时执行
          if (that.data.BleCon) {
            if (nextList == '00' && that.data.resStr.substring(6, 14) != 'ffffffff') {
              //没有下一条数据时执行有下一条记录");
              let log = { mac: that.data.deviceId, start_time: startTime, continuous: timing, action_type: type }
              var logArr = wx.getStorageSync('logDataList')
              let len = logArr.length
              logArr[len] = log
              wx.setStorageSync('logDataList', logArr)
              let data = 'DB060601' + that.data.resStr.substring(6, 14)
              that.writeBle(that.data.deviceId, that.data.serviceId, data)
            } else if (nextList == '01' && that.data.resStr.substring(6, 14) != 'ffffffff') {
              let log = {
                mac: that.data.deviceId,
                start_time: startTime,
                continuous: timing,
                action_type: type
              }
              let logArr = wx.getStorageSync('logDataList')
              if (timing != '0') {
                logArr[logArr.length] = log
              }
              wx.setStorageSync('logDataList', logArr)
              let data = 'DB060601' + that.data.resStr.substring(6, 14)
              that.writeBle(that.data.deviceId, that.data.serviceId, data)
            } else if (nextList == '00' && that.data.resStr.substring(6, 14) == 'ffffffff') {
              that.syncLogData()
            }
          }

        } else if (instructions == 'bd0705') {
          that.setData({
            result: that.arrayBufferToString(characteristic.value),
            resStr: that.buf2hex(characteristic.value),
            timehalf: that.buf2hex(characteristic.value).substring(6, 14)
          })
          let startTime = that.formatDate(that.hex2int(that.data.resStr.substring(6, 14)))
          let timing = String(that.hex2int(that.data.resStr.substring(14, 18)))
          let type = Number(that.hex2int(that.data.resStr.substring(18, 20)))
          let logArr = wx.getStorageSync('logDataList')
          //蓝牙有链接 并且有记录返回时执行
          if (that.data.BleCon) {
            let log = { mac: that.data.deviceId, start_time: startTime, continuous: timing, action_type: type }
            if (timing != '0') {
              logArr[logArr.length] = log
              wx.setStorageSync('logDataList', logArr)
              that.syncLogData()
            }
          }

        } else if (instructions == 'bd1102' || instructions == 'bd0002' || instructions == 'bd0202') {
          clearInterval(that.data.timeInterval)
          that.setData({
            result: that.arrayBufferToString(characteristic.value),
            resStr: that.buf2hex(characteristic.value),
            time: '-- --',
            nextTime: ''
          })
          //消杀中
          if (that.data.result[3] == '1') {
            that.setData({
              flag: 4,
            })
            var time = that.data.resStr;
            var s = time.substring(8, 12)
            var hs = time.substring(12, 16)
            //开始消杀时间 = 当前已消杀时间 - 当前时间戳
            var t = that.hex2int(s) - that.hex2int(hs);
            that.setData({
              timeInterval: setInterval(function () {
                t--;
                if (t >= 0) {
                  that.setData({
                    time: that.s_to_hs(t)
                  })
                }
              }, 1000),
              flag: 4
            })

          } else {
            //不在消杀中
            var time = that.data.resStr;
            var nextTime = time.substring(18, 26)
            console.log('下次开始消杀时间戳:' + that.hex2int(nextTime))
            var nextT = Number(that.hex2int(nextTime))
            console.log(that.formatDate(nextT))
            that.setData({
              nextTime: that.formatDate(nextT).split(" ")[1],
              flag: 3,
            })
          }
          var dl = (that.data.dlVal != 0 && that.data.dlVal >= that.hex2int(that.data.resStr.substring(16, 18))) ? that.data.dlVal : that.hex2int(that.data.resStr.substring(16, 18))
          //电池电量  
          that.setData({
            dl: dl + '%'
          })

        } else if (instructions == 'bd0b02') {
          clearInterval(that.data.timeInterval)
          that.setData({
            result: that.arrayBufferToString(characteristic.value),
            resStr: that.buf2hex(characteristic.value),
            time: '-- --',
            nextTime: '',
            clickCunter: 0
          })
          //消杀中
          if (that.data.result[3] == '1') {
            wx.hideLoading({
              success: (res) => {
                var time = that.data.resStr;
                var s = time.substring(8, 12)
                var hs = time.substring(12, 16)
                var t = that.hex2int(s) - that.hex2int(hs);
                that.setData({
                  timeInterval: setInterval(function () {
                    t--;
                    if (t >= 0) {
                      that.setData({
                        time: that.s_to_hs(t)
                      })
                    }
                  }, 1000),
                  flag: 4
                })
              },
            })

          } else {
            //不在消杀中
            var time = that.data.resStr;
            var nextTime = time.substring(18, 26)
            var nextT = Number(that.hex2int(nextTime))
            that.setData({
              nextTime: that.formatDate(nextT).split(" ")[1],
              flag: 3,
            })
          }
          var dl = (that.data.dlVal != 0 && that.data.dlVal >= that.hex2int(that.data.resStr.substring(16, 18))) ? that.data.dlVal : that.hex2int(that.data.resStr.substring(16, 18))
          //电池电量  
          that.setData({
            dl: dl + '%'
          })
        } else if (instructions == 'bd0d07') {
          let value = that.arrayBufferToString(characteristic.value)
          let listvalue = that.buf2hex(characteristic.value)
          that.ToList(value)
          that.setData({
            Listvalue: listvalue,
            c: true
          })
        } else if (instructions == 'bd0d08') { //修改消杀列表后的响应值
          let value = that.arrayBufferToString(characteristic.value)
          let listvalue = that.buf2hex(characteristic.value)
          that.setData({
            Listvalue: listvalue,
            c: true
          })
          that.ToList(value)
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 2000)
        } else if (instructions == 'bd05a1') {
          that.setData({
            DLwran: true,
          })
        }
      })
    },
    fail: (res) => {
      that.notify()

    },
    complete: (res) => { },
  })
}
