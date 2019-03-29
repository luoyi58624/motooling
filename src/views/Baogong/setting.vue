<!--  -->
<template>
  <div class="body">
    <myHeader title="设置"/>
    <div style="height:40px;"></div>
    <div class="wrapper">
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input } from "cube-ui";
import myHeader from "@/components/header";
import { getSettingList,saveParamList} from "@/api/baogong/baogong";
export default {
  data() {
    return {
      value: true,
      list: {
        status: 0,
        code: "000000",
        data: {
          list: [
            {
              id: 1,
              code: "p01",
              name: "自动接收下道工序",
              val: "1",
              unit: null,
              remark: null,
              sort: null
            },
            {
              id: 2,
              code: "p02",
              name: "工件正常完成时自动转出",
              val: "0",
              unit: null,
              remark: null,
              sort: null
            },
            {
              id: 3,
              code: "p03",
              name: "工件未按期完成时重排后续工序",
              val: "0",
              unit: null,
              remark: null,
              sort: null
            },
            {
              id: 4,
              code: "p04",
              name: "进入页面时是否默认选择第一套设备",
              val: "0",
              unit: null,
              remark: null,
              sort: null
            },
            {
              id: 5,
              code: "p05",
              name: "待加工列表是否只显示制定设备的任务",
              val: "0",
              unit: null,
              remark: null,
              sort: null
            },
            {
              id: 6,
              code: "p06",
              name: "多工件同时开始加操作允许时间",
              val: "10",
              unit: "秒",
              remark: null,
              sort: null
            },
            {
              id: 7,
              code: "p07",
              name: "工作按时完成允许误差",
              val: "5",
              unit: "分钟",
              remark: null,
              sort: null
            },
            {
              id: 8,
              code: "p08",
              name: "质检结果是否在不合理时推送报告",
              val: "0",
              unit: null,
              remark: null,
              sort: null
            },
            {
              id: 9,
              code: "p09",
              name: "有新消息时提醒方式",
              val: "1",
              unit: "",
              remark: "1提示对话框，2仅提醒",
              sort: null
            },
            {
              id: 10,
              code: "p10",
              name: "加工顺序是否只按排除顺序",
              val: "0",
              unit: "",
              remark: null,
              sort: null
            },
            {
              id: 11,
              code: "p11",
              name: "报工完成确认人员",
              val: "1",
              unit: "",
              remark: "1接收人，2转出人",
              sort: null
            }
          ]
        },
      
      }
    };
  },

  components: {
    myHeader
  },

  computed: {},
  created() {
    getSettingList().then(res => {
      console.log(res);
    });
  },

  methods: {
    _saveParamList(id,code,name,val,unitremark){
      saveParamList({id,code,name,val,unitremark}).then(res=>{
        console.log(res)
      })

    }
  }
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
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding: 0 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 200;
  > div:nth-child(2) {
    height: 20px;
    > div {
      height: 20px;
    }
  }
}
</style>