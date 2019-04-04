<!--  -->
<template>
  <div class="body">
    <myHeader title="设置"/>
    <div style="height:40px;"></div>
    <div class="wrapper">
      <div class="list" v-for="(item) in list" :key="item.id">
        <div>{{item.name}}</div>
        <div>
          <div v-if="item.code=='p06'" class="time" @click="showTime1">{{item.val}}{{item.unit}}</div>
          <div
            v-else-if="item.code=='p07'"
            class="time"
            @click="showTime2"
          >{{item.val}}{{item.unit}}</div>
          <div v-else-if="item.code=='p11'" class="radio">
            <div
              :class="{active:item.val==1}"
              @click="changeP(item.id,item.code,item.name,1,item.unit,item.remark)"
            >
              <div></div>接收人
            </div>
            <div
              :class="{active:item.val==2}"
              @click="changeP(item.id,item.code,item.name,2,item.unit,item.remark)"
            >
              <div></div>转出人
            </div>
          </div>
          <div
            v-else-if="item.code=='p09'"
            @click="changeTx(item.id,item.code,item.name,item.val,item.unit,item.remark)"
          >
            {{tx[item.val==1?0:1]['text']}}
            <span class="iconfont icon-xiangxia"></span>
          </div>
          <cube-switch
            v-else
            v-model="item.val"
            class="switch"
            @input="change(item.id,item.code,item.name,item.val,item.unit,item.remark)"
          ></cube-switch>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input } from "cube-ui";
import myHeader from "@/components/header";
import { getSettingList, saveParamList } from "@/api/baogong/baogong";
const column1 = [
  { text: "剧毒", value: "剧毒" },
  { text: "蚂蚁", value: "蚂蚁" },
  { text: "幽鬼", value: "幽鬼" }
];
export default {
  data() {
    return {
      value: true,
      options: [1, 2],
      list: [],
      tx: [{ text: "提示对话框", value: "1" }, { text: "仅提醒", value: "2" }],
      time1: [{ text: "1", value: "1" }, { text: "2", value: "2" }],
       time2: [{ text: "1", value: "1" }, { text: "2", value: "2" }],
    };
  },

  components: {
    myHeader
  },

  computed: {},
  created() {
    getSettingList().then(res => {
      console.log(res.list);
      for (var i = 0; i < res.list.length; i++) {
        if (!["p06", "p07", "p09","p11"].includes(res.list[i].code)) {
          res.list[i].val = res.list[i].val == 0 ? false : true;
        }
        this.list = res.list;
      }
    });
  },

  methods: {
    changeP(id, code, name, val) {
      const that = this;
      saveParamList({
        list: [{ id: id, code, name, val }]
      }).then(res => {
        console.log(val);
        that.list[10].val = val;
      });
    },
    change(id, code, name, val, unit, remark) {
      saveParamList({
        list: [{ id: id, code, val: val == true ? 1 : 0 }]
      }).then(res => {
        console.log(res);
        //that.list[8].val = selectedVal.join(", ");
      });
    },
    showTime1() {
      
        this.picker = this.$createPicker({
          title: "允许时间",
          data: [this.time1],
          onSelect: this.selectHandleTime1
        });
      
      this.picker.show();
    },
     showTime2() {
      
        this.picker = this.$createPicker({
          title: "允许误差",
          data: [this.time2],
          onSelect: this.selectHandleTime2
        });
      
      this.picker.show();
    },
    
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.$createDialog({
        type: "warn",
        content: `Selected Item: <br/> - value: ${selectedVal.join(
          ", "
        )} <br/> - index: ${selectedIndex.join(
          ", "
        )} <br/> - text: ${selectedText.join(" ")}`,
        icon: "cubeic-alert"
      }).show();
    },
    cancelHandle() {
      this.$createToast({
        type: "correct",
        txt: "Picker canceled",
        time: 1000
      }).show();
    },
    changeTx(id, code, name, val, unit, remark) {
      //console.log(2)
      this.picker = this.$createPicker({
        title: "选择提醒方式",
        data: [this.tx],
        onSelect: this.selectTx
      });
      this.picker.show();
    },
    selectTx(selectedVal, selectedIndex, selectedText) {
      const that = this;
      console.log({ selectedVal, selectedIndex, selectedText });
      saveParamList({
        list: [{ id: 9, code: "p09", val: selectedVal.join(", "),unit:this.list[8].unit,remark:this.list[8].remark}]
      }).then(res => {
        console.log(res);
        that.list[8].val = selectedVal.join(", ");
      });
    },
    selectHandleTime1(selectedVal, selectedIndex, selectedText) {
     // console.log(selectedVal.join(", "))
      saveParamList({
        list: [{ id: 6, code: "p06", val: selectedVal.join(", ") }]
      }).then(res => {
        this.list[5].val = selectedVal.join(", ");
      });
    },
     selectHandleTime2(selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal.join(", "))
      saveParamList({
        list: [{ id: 7, code: "p07", val: selectedVal.join(", ") }]
      }).then(res => {
        this.list[6].val = selectedVal.join(", ");
      });
    }
  },
  watch: {
    list() {
      console.log(this.list);
    }
  },
  _saveParamList(id, code, name, val, unitremark) {
    saveParamList({ id, code, name, val, unitremark }).then(res => {
      console.log(res);
    });
  },
};
</script>
<style lang='less' scoped>
.body {
  background: #eee;
}

.wrapper {
  padding-left: 10px;
  margin-top: 10px;
  background: #fff;
}
.list {
  height: 50px;
  font-size: 12px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding: 0 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 200;
  > div:nth-child(2) {
    height: 20px;
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.cube-switch .cube-switch-ui {
  height: 10px !important;
}
.time {
  width: 50px;
  height: 20px;
  border: 1px solid #dcdcdc;
  color: #adadad;
  text-align: center;
  line-height: 20px;
  border-radius: 5px;
}
.radio {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    flex: 1;
    margin: 0 20px;
    > div {
      border: 1px solid #adadad;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: 0 10px;
    }
  }
  > div.active {
    > div {
      border: 1px solid #4e92ff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    > div::after {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      background: #4e92ff;
      border-radius: 50%;
    }
  }
}
</style>