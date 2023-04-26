<template>
  <div class="board-list">
    <div class="common-buttons">
      <button
        type="button"
        class="w3-button w3-round w3-blue-gray"
        @click="fnWrite"
      >
        등록
      </button>
    </div>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>No</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일</th>
        </tr>
      </thead>
      <!-- 게시판 내용 가져오기 -->
      <tbody>
        <tr v-for="(row, idx) in list" :key="idx">
          <td>{{ row.idx }}</td>
          <td>
            <a @click="fnView(`${row.idx}`)">{{ row.title }}</a>
          </td>
          <td>{{ row.author }}</td>
          <td>{{ row.created_at }}</td>
        </tr>
      </tbody>

      <!-- <tbody>
        <tr v-for="(row, idx) in list" :key="idx">
          <td>{{ row.idx }}</td>
          <td>
            <a v-on:click="fnView(`${row.idx}`)">{{ row.title }}</a>
          </td>
          <td>{{ row.author }}</td>
          <td>{{ row.created_at }}</td>
        </tr>
      </tbody> -->
    </table>
    <!-- 페이지네이션 시작 -->
    <div
      class="pagination w3-bar w3-padding-16 w3-small"
      v-if="paging.total_list_cnt > 0"
    >
      <span class="pg">
        <a
          href="javascript:;"
          @click="fnPage(1)"
          class="first w3-button w3-border"
          >&lt;&lt;</a
        >
        <a
          href="javascript:;"
          v-if="paging.start_page > 10"
          @click="fnPage(`${paging.start_page - 1}`)"
          class="prev w3-button w3-border"
          >&lt;</a
        >
        <template v-for="(n, index) in paginavigation()">
          <template v-if="paging.page == n">
            <strong class="w3-button w3-border w3-green" :key="index">{{
              n
            }}</strong>
          </template>
          <template v-else>
            <a
              class="w3-button w3-border"
              href="javascript:;"
              @click="fnPage(`${n}`)"
              :key="index"
              >{{ n }}</a
            >
          </template>
        </template>
        <a
          href="javascript:;"
          v-if="paging.total_page_cnt > paging.end_page"
          @click="fnPage(`${paging.end_page + 1}`)"
          class="next w3-button w3-border"
          >&gt;</a
        >
        <a
          href="javascript:;"
          @click="fnPage(`${paging.total_page_cnt}`)"
          class="last w3-button w3-border"
          >&gt;&gt;</a
        >
      </span>
    </div>
    <!-- 페이지네이션 끝 -->
  </div>
</template>

<script>
export default {
  name: "BoardList",
  data() {
    //변수생성
    return {
      requestBody: {}, // 리스트 페이지 데이터전송
      list: {}, // 게시판 데이터
      no: "", // 게시판 숫자처리
      paging: {
        block: 0,
        end_page: 0,
        next_block: 0,
        page: 0,
        page_size: 0,
        start_index: 0,
        start_page: 0,
        total_block_cnt: 0,
        total_list_cnt: 0,
        total_page_cnt: 0,
      }, //페이징 데이터
      page: this.$route.query.page ? this.$route.query.page : 1,
      size: this.$route.query.size ? this.$route.query.size : 10,
      keyword: this.$route.query.keyword,
      paginavigation: function () {
        //페이징 처리 for문 커스텀
        let pageNumber = [];
        let start_page = this.paging.start_page;
        let end_page = this.paging.end_page;
        for (let i = start_page; i <= end_page; i++) {
          return pageNumber;
        }
      },
    };
  },
  mounted() {
    this.fnGetList();
  },
  methods: {
    // 게시글 불러오기
    fnGetList() {
      this.requestBody = {
        // 데이터전송
        keyword: this.keyword,
        page: this.page,
        size: this.size,
      };
      this.$axios
        .get(this.$serverUrl + "/board/list", {
          params: this.requestBody,
          headers: {},
        })
        .then((res) => {
          this.list = res.data; //서버에서 데이터를 목록으로 보내므로 바로 할당하여 사용할 수 있다.
        })
        .catch((err) => {
          if (err.message.indexIf("Network Error") > -1) {
            alert("네트워크가 원할하지 않습니다. /n잠시 후 다시 시도해주세요.");
          }
        });
    },
    fnView(idx) {
      this.requestBody.idx = idx;
      this.$router.push({
        path: "./detail",
        query: this.requestBody,
      });
    },
    fnWrite() {
      this.$router.push({
        path: "./write",
      });
    },
    fnPage(n) {
      if (this.page !== n) {
        this.page = n;
        this.fnGetList();
      }
    },
    // 게시글 상세보기
    // fnView(idx) {},

    // fnGetList() {
    //   this.list = [
    //     {
    //       idx: 1,
    //       title: "제목1",
    //       author: "작성자1",
    //       created_at: "작성일시1",
    //     },
    //     {
    //       idx: 2,
    //       title: "제목2",
    //       author: "작성자2",
    //       created_at: "작성일시2",
    //     },
    //     {
    //       idx: 3,
    //       title: "제목3",
    //       author: "작성자3",
    //       created_at: "작성일시3",
    //     },
    //   ];
    // },
  },
};
</script>

<style></style>
