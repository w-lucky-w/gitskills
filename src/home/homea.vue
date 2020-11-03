<template>
    <div class="homea">
        <div class="side">
            <p class="title">导师遴选系统</p>
            <el-menu
				:default-active="active"
				class="el-menu"
				@open="handleOpen"
				@close="handleClose"
				background-color="#222222"
				text-color="#fff"
				router
				active-text-color="#ffd04b">
                <template v-for="(item,i) in per">

                    <el-submenu v-if="item.children && item.children.length!=0" :index="item.name">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item
							v-for="(m,idx) in item.children"
							:index="m.name"
							@click="handleGo(m)"
                        >{{ m.title }}</el-menu-item>
                    </el-submenu>

                    <el-menu-item
						v-else
						:index="item.name"
						@click="handleGo(item)"
                    >
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>

                </template>

            </el-menu>
        </div>
        <div class="main">
            <div class="header">
                <div class="right">
                    <el-dropdown @command="handleCommand">
                          <span class="el-dropdown-link">
                            {{ cuser.user }}<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="base">基本资料</el-dropdown-item>
                            <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
                            <el-dropdown-item command="exit">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="container">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "homea",
        data() {
          return {
              active: ''
          }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleGo(item) {
                this.$router.push({name: item.name})
            },
            handleCommand(command) {
                this.$message('click on item ' + command);
            }
        },
		//计算属性
        computed: {
            ...mapState(['cuser','per'])
        },
        mounted() {
            this.active = this.$route.name
        }
    }
</script>

<style scoped>
    .home {
        display: flex;
    }
    .side {
        position: absolute;
        left: 0;
        top: 0;
        width: 220px;
        bottom: 0;
        background: #222222;
        overflow: auto;
    }
    .side .title {
        line-height: 50px;
        text-align: center;
        color: rgba(255,255,255,0.8);
    }
    .el-menu {
        width: 100%;
    }
    .main {
        flex: 1;
        position: absolute;
        left: 220px;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .main .header {
        position: fixed;
        left: 220px;
        top: 0;
        right: 0;
        height: 50px;
        background: white;
        box-sizing: border-box;

        display: flex;
        align-items: center;
    }
    .header .right {
        flex: 1;
        text-align: right;
        padding-right: 10px;
        box-sizing: border-box;
    }

    .main .container {
        position: absolute;
        left: 0;
        top: 50px;
        right: 0;
        bottom: 0;
        padding: 15px;
        box-sizing: border-box;
        background: #f2f2f2;
        overflow: auto;
    }

</style>