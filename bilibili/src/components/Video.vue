<template>
  <div class="video-box">
    <ul class="video-list" v-if="videoOldList.length">
      <li class="video" v-for="video in videoList" :key="video.id">
        <div class="poster">
          <img :src="video.poster" :alt="video.title" />
          <div class="info">
            <div class="play">
              <svg viewBox="0 0 1024 1024">
                <path
                  d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                ></path>
                <path
                  d="M684.8 483.2l-256-112c-22.4-9.6-44.8 6.4-44.8 28.8v224c0 22.4 22.4 38.4 44.8 28.8l256-112c25.6-9.6 25.6-48 0-57.6z"
                ></path>
              </svg>
              {{ video.play }}
            </div>
            <div class="rank" v-if="video.rank">
              <svg viewBox="0 0 1024 1024">
                <path
                  d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                ></path>
                <path
                  d="M240 384h64v64h-64zM368 384h384v64h-384zM432 576h352v64h-352zM304 576h64v64h-64z"
                ></path>
              </svg>
              {{ video.rank }}
            </div>
          </div>
        </div>
        <div class="title">
          {{ video.title }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoOldList: [],
      videoFlag: false,
      videoCount: 0
    };
  },
  computed: {
    videoList() {
      return this.videoOldList.map(video => {
        video.play =
          video.play > 10000 ? video.play / 10000 + "万" : video.play;
        video.rank =
          video.rank > 10000 ? video.rank / 10000 + "万" : video.rank;
        return video;
      });
    }
  },
  methods: {
    async getData() {
      const res = await this.axios.get("video", {
        params: {
          start: 0,
          offset: 12
        }
      });
      this.videoOldList = res.data;
    },
    childMethod(e) {
      const { scrollHeight, offsetHeight, scrollTop } = e.target;
      const toBottomHeight = scrollHeight - offsetHeight - scrollTop;
      const videoLength = this.videoList.length;
      if (videoLength === this.videoCount) {
        return;
      }
      if (toBottomHeight < 200 && !this.videoFlag) {
        this.videoFlag = true;
        this.axios
          .get("video", {
            params: {
              start: this.videoList.length,
              offset: 12
            }
          })
          .then(res => {
            this.videoOldList.push(...res.data);
            this.videoCount = res.count;
            this.videoFlag = false;
          });
      }
    }
  },
  mounted() {
    this.getData();
    // 监听父组件的事件
    this.$nextTick(() => {
      this.$on("childMethod", function(e) {
        this.childMethod(e);
      });
    });
  }
};
</script>
<style lang="less" scoped>
.video-box {
  padding: 100px 6px 0 6px;
  .video-list {
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .video {
      float: left;
      width: 50%;
      .poster {
        position: relative;
        height: 106px;
        margin: 0 6px;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        .info {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 20px;
          padding: 7px 0 3px 10px;
          color: #fff;
          font-size: 12px;
          background-image: linear-gradient(
            rgba(33, 33, 33, 0),
            rgba(33, 33, 33, 0.5)
          );
          div {
            display: inline-flex;
            align-items: center;
            margin-right: 10px;
          }
          svg {
            width: 14px;
            height: 14px;
            margin-right: 3px;
            fill: #fff;
          }
        }
      }
      .title {
        margin: 6px 6px 10px 6px;
        height: 38px;
        line-height: 20px;
        font-size: 13px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>
