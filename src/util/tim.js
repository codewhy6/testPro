import { options } from "less";

/*
 * @Description:即时通信im api
 * @fileName:
 * @Author: ZhangChen
 * @Date: 2021-02-22 10:55:12
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-02-22 17:03:23
 */
const timApi = {
  /**
   * @Description: 登录
   * @Author: ZhangChen
   * @Date: 2021-02-22 10:59:03
   * @param {*} options
   * @return {*}
   */
  login(options) {
    // 默认值
    let defaults = {
      userId: '',
      sig: '',
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    let promise = tim.login({
      userID: defaults.userId,
      userSig: defaults.sig
    });
    promise
      .then(function (imResponse) {
        // console.log(imResponse.data,'登录成功'); // 登录成功
        if (imResponse.data.repeatLogin === true) {
          // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
          // console.log(imResponse.data.errorInfo,'重复登录');
          defaults.callback && defaults.callback()
        }

      })
      .catch(function (imError) {
        console.warn("login error:", imError); // 登录失败的相关信息
      });
  },

  /**
   * @Description: 登出即时通信 IM
   * @Author: ZhangChen
   * @Date: 2021-02-22 14:35:14
   * @param {*} callback
   * @return {*}
   */
  logout(callback) {
    let promise = tim.logout();
    promise.then(function (imResponse) {
      // console.log(imResponse.data); // 登出成功
      callback && callback(imResponse.data)
    }).catch(function (imError) {
      console.warn('logout error:', imError);
    });
  },


  /*-------------------------------消息-------------------------------*/
  /**
   * @Description: 创建文本消息并发送
   * @Author: ZhangChen
   * @Date: 2021-02-22 14:05:08
   * @param {*} options
   * @return {*}
   */
  sendMessage(options) {
    // 默认值
    let defaults = {
      type: 'text', //-- 发送消息的类型  image \ custom
      userId: '',
      conversationType: 'TIM.TYPES.CONV_C2C',
      payload: '' || {},
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    // 发送文本消息，Web 端与小程序端相同
    // 1. 创建消息实例，接口返回的实例可以上屏
    let message;
    if (defaults.type == 'text') {
      message = tim.createTextMessage({
        to: defaults.userId,
        conversationType: defaults.conversationType,
        // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息
        // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
        // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
        payload: {
          text: defaults.payload
        }
      });
    } else if (defaults.type == 'image') {
      message = tim.createImageMessage({
        to: defaults.userId,
        conversationType: defaults.conversationType,
        // payload: {
        //   file: document.getElementById('imagePicker'),
        // },
        payload: defaults.payload,
        onProgress: function (event) { console.log('file uploading:', event) }
      });
    } else if (defaults.type == 'custom') {
      // 2. 创建消息实例，接口返回的实例可以上屏
      message = tim.createCustomMessage({
        to: 'user1',
        conversationType: defaults.conversationType,
        // payload: {
        //   data: 'dice', // 用于标识该消息是骰子类型消息
        //   description: String(random(1, 6)), // 获取骰子点数
        //   extension: ''
        // }
        payload: defaults.payload
      });

    }
    // 2. 发送消息
    let promise = tim.sendMessage(message);
    promise.then(function (imResponse) {
      // 发送成功
      // console.log(imResponse);
      defaults.callback && defaults.callback(imResponse)
    }).catch(function (imError) {
      // 发送失败
      console.warn('sendMessage error:', imError);
    });
  },

  /**
   * @Description: 分页拉取指定会话的消息列表的接口，当用户进入会话首次渲染消息列表或者用户“下拉查看更多消息”时。
   * @Author: ZhangChen
   * @Date: 2021-02-22 14:21:48
   * @param {*} options
   * @return {*}
   */
  getMessageList(options) {
    // 默认值
    let defaults = {
      conversationID: '',
      nextReqMessageID: '',
      count: 15,
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    // 打开某个会话时，第一次拉取消息列表
    let promise = tim.getMessageList({ conversationID: defaults.conversationID, nextReqMessageID: defaults.nextReqMessageID, count: defaults.count });
    promise.then(function (imResponse) {
      const messageList = imResponse.data.messageList; // 消息列表。
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
      let result = {}
      result.messageList = messageList
      result.nextReqMessageID = nextReqMessageID
      result.isCompleted = isCompleted
      defaults.callback && defaults.callback(result)
    });
  },


  /**
   * @Description: 将某会话下的未读消息状态设置为已读
   * @Author: ZhangChen
   * @Date: 2021-02-22 16:51:11
   * @param {*} options
   * @return {*}
   */
  setMessageRead(options) {
    // 默认值
    let defaults = {
      conversationID: '',
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    // 将某会话下所有未读消息已读上报
    let promise = tim.setMessageRead({ conversationID: defaults.conversationID });
    promise.then(function (imResponse) {
      // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
      defaults.callback && defaults.callback(result)
    }).catch(function (imError) {
      // 已读上报失败
      console.warn('setMessageRead error:', imError);
    });
  },
  /*-------------------------------会话-------------------------------*/
  /**
   * @Description: 获取会话列表的接口
   * @Author: ZhangChen
   * @Date: 2021-02-22 14:09:28
   * @param {*} callback
   * @return {*}
   */
  getConversationList(callback) {
    // 拉取会话列表
    let promise = tim.getConversationList();
    promise.then(function (imResponse) {
      const conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
      callback && callback(conversationList)
    }).catch(function (imError) {
      console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
    });
  },

  /**
   * @Description: 获取会话资料的接口，当点击会话列表中的某个会话时，调用该接口获取会话的详细信息。
   * @Author: ZhangChen
   * @Date: 2021-02-22 14:11:56
   * @param {*} options
   * @return {*}
   */
  getConversationProfile(options) {
    // 默认值
    let defaults = {
      conversationID: '',
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    let promise = tim.getConversationProfile(defaults.conversationID);
    promise.then(function (imResponse) {
      // 获取成功
      // console.log(imResponse.data.conversation); // 会话资料
      defaults.calllback && defaults.calllback(imResponse.data.conversation)
    }).catch(function (imError) {
      console.warn('getConversationProfile error:', imError); // 获取会话资料失败的相关信息
    });
  },

  /*-------------------------------群组-------------------------------*/
  /**
   * @Description: 创建群组
   * @Author: ZhangChen
   * @Date: 2021-02-22 14:37:16
   * @param {*} type {
   *  TIM.TYPES.GRP_WORK（好友工作群，默认）
      TIM.TYPES.GRP_PUBLIC（陌生人社交群）
      TIM.TYPES.GRP_MEETING（临时会议群）
      TIM.TYPES.GRP_AVCHATROOM（直播群）
   * }
   * @param {*} options
   * @return {*}
   */
  createGroup(options) {
    // 默认值
    let defaults = {
      type: 'TIM.TYPES.GRP_WORK',
      name: '',
      groupID: '',
      memberList: [],
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    // 创建好友工作群
    let promise = tim.createGroup({
      type: defaults.type,
      name: defaults.name,
      groupID: defaults.groupID,
      memberList: defaults.memberList
      // memberList: [{
      //   userID: 'user1',
      //   // 群成员维度的自定义字段，默认情况是没有的，需要开通，详情请参阅自定义字段
      //   memberCustomField: [{ key: 'group_member_test', value: 'test' }]
      // }, {
      //   userID: 'user2'
      // }] // 如果填写了 memberList，则必须填写 userID
    });
    promise.then(function (imResponse) { // 创建成功
      // console.log(imResponse.data.group); // 创建的群的资料
      defaults.callback && defaults.callback(imResponse.data.group)
    }).catch(function (imError) {
      console.warn('createGroup error:', imError); // 创建群组失败的相关信息
    });
  },

  /**
   * @Description: 申请加群的接口
   * @Author: ZhangChen
   * @Date: 2021-02-22 15:05:45
   * @param {*} options
   * @return {*}
   */
  joinGroup(options) {
    // 默认值
    let defaults = {
      groupID: '',
      type: '',
      callback() { },
      callback2() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    let promise = tim.joinGroup({ groupID: defaults.groupID, type: defaults.type });
    promise.then(function (imResponse) {
      switch (imResponse.data.status) {
        // 等待管理员同意
        case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL:
          break;
        // 加群成功
        case TIM.TYPES.JOIN_STATUS_SUCCESS:
          // console.log(imResponse.data.group); // 加入的群组资料
          defaults.callback && defaults.callback(imResponse.data.group)
          break;
        // 已经在群中
        case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP:
          defaults.callback2 && defaults.callback2()
          break;
        default:
          break;
      }
    }).catch(function (imError) {
      console.warn('joinGroup error:', imError); // 申请加群失败的相关信息
    });
  },


  /**
   * @Description: 退出群组
   * @Author: ZhangChen
   * @Date: 2021-02-22 15:13:06
   * @param {*} options
   * @return {*}
   */
  quitGroup(options) {
    // 默认值
    let defaults = {
      groupID: '',
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    let promise = tim.quitGroup(defaults.groupID);
    promise.then(function (imResponse) {
      // console.log(imResponse.data.groupID); // 退出成功的群 ID
      defaults.callback && defaults.callback(imResponse.data.groupID)

    }).catch(function (imError) {
      console.warn('quitGroup error:', imError); // 退出群组失败的相关信息
    });
  },

  /**
   * @Description: 修改群组资料  /  全体禁言
   * @Author: ZhangChen
   * @Date: 2021-02-22 15:24:23
   * @param {*} options
   * @return {*}
   */
  updateGroupProfile(options) {
    // 默认值
    let defaults = {
      groupID: '',
      name: '',// 修改群名称
      introduction: '',// 修改群公告
      muteAllMembers: false, // true 表示全体禁言，false表示取消全体禁言
      groupCustomField: [],
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    let promise = tim.updateGroupProfile({
      groupID: defaults.groupID,
      name: defaults.name,
      introduction: defaults.introduction,
      muteAllMembers: defaults.muteAllMembers
      // v2.6.0 起，群成员能收到群自定义字段变更的群提示消息，且能获取到相关的内容，详见 Message.payload.newGroupProfile.groupCustomField
      // groupCustomField: [{ key: 'group_level', value: 'high' }] // 修改群组维度自定义字段
    });
    promise.then(function (imResponse) {
      // console.log(imResponse.data.group) // 修改成功后的群组详细资料
      defaults.callback && defaults.callback(imResponse.data.group)
    }).catch(function (imError) {
      console.warn('updateGroupProfile error:', imError); // 修改群组资料失败的相关信息
    });
  },

  /*-------------------------------群成员-------------------------------*/
  /**
   * @Description: 获取群成员列表
   * @Author: ZhangChen
   * @Date: 2021-02-22 16:03:33
   * @param {*} options
   * @return {*}
   */
  getGroupMemberList(options) {
    // 默认值
    let defaults = {
      groupID: '',
      count: 30, //--需要拉取的数量
      offset: 0, //--偏移量，默认从0开始拉取
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    let promise = tim.getGroupMemberList({ groupID: defaults.groupID, count: defaults.count, offset: defaults.offset }); // 从0开始拉取30个群成员
    promise.then(function (imResponse) {
      // console.log(imResponse.data.memberList); // 群成员列表
      defaults.callback && defaults.callback(imResponse.data.memberList)
      // for (let groupMember of imResponse.data.memberList) {
      //   if (groupMember.muteUntil * 1000  > Date.now()) {
      //     console.log(`${groupMember.userID} 禁言中`);
      //   } else {
      //     console.log(`${groupMember.userID} 未被禁言`);
      //   }
      // }
    }).catch(function (imError) {
      console.warn('getGroupMemberList error:', imError);
    });
  },


  /**
   * @Description: 获取群成员资料，如禁言时间等。
   * @Author: ZhangChen
   * @Date: 2021-02-22 16:07:31
   * @param {*} options
   * @return {*}
   */
  getGroupMemberProfile(options) {
    // 默认值
    let defaults = {
      groupID: '',
      userIDList: [],
      memberCustomFieldFilter: [],
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    let promise = tim.getGroupMemberProfile({
      groupID: defaults.groupID,
      userIDList: defaults.userIDList, // 请注意：即使只拉取一个群成员的资料，也需要用数组类型，例如：userIDList: ['user1']
      memberCustomFieldFilter: defaults.memberCustomFieldFilter, // 筛选群成员自定义字段：group_member_custom
    });
    promise.then(function (imResponse) {
      // console.log(imResponse.data.memberList); // 群成员列表
      defaults.callback && defaults.callback(imResponse.data.memberList)
    }).catch(function (imError) {
      console.warn('getGroupMemberProfile error:', imError);
    });
  },

  /**
   * @Description: 添加群成员
   * @Author: ZhangChen
   * @Date: 2021-02-22 16:14:59
   * @param {*} options
   * @return {*}
   */
  addGroupMember(options) {
    // 默认值
    let defaults = {
      groupID: '',
      userIDList: [],
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    let promise = tim.addGroupMember({ groupID: defaults.groupID, userIDList: defaults.userIDList });
    promise.then(function (imResponse) {
      // console.log(imResponse.data.successUserIDList); // 添加成功的群成员 userIDList
      // console.log(imResponse.data.failureUserIDList); // 添加失败的群成员 userIDList
      // console.log(imResponse.data.existedUserIDList); // 已在群中的群成员 userIDList
      // console.log(imResponse.data.group); // 添加后的群组信息
      defaults.callback && defaults.callback({
        successUserIDList: imResponse.data.successUserIDList,
        failureUserIDList: imResponse.data.failureUserIDList,
        existedUserIDList: imResponse.data.existedUserIDList,
        groupData: imResponse.data.group,
      })

    }).catch(function (imError) {
      console.warn('addGroupMember error:', imError); // 错误信息
    });
  },

  /**
   * @Description: 删除群成员
   * @Author: ZhangChen
   * @Date: 2021-02-22 16:49:02
   * @param {*} options
   * @return {*}
   */
  deleteGroupMember(options) {
    // 默认值
    let defaults = {
      groupID: '',
      userIDList: [],
      reason: '',
      callback() { },
    }
    // 使用assign会将options中的属性覆盖defaults中的属性
    Object.assign(defaults, options)
    let promise = tim.deleteGroupMember({ groupID: defaults.groupID, userIDList: defaults.userIDList, reason: defaults.reason });
    promise.then(function (imResponse) {
      // console.log(imResponse.data.group); // 删除后的群组信息
      // console.log(imResponse.data.userIDList); // 被删除的群成员的 userID 列表
      defaults.callback && defaults.callback({
        groupData: imResponse.data.group,
        userIDList: imResponse.data.userIDList,
      })
    }).catch(function (imError) {
      console.warn('deleteGroupMember error:', imError); // 错误信息
    });
  },
}
export default timApi