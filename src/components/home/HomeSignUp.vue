<template>
  <div id="app">
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="UsrName" prop="usrName">
        <el-input v-model="ruleForm.usrName" placeholder="Please Input UsrName" clearable></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="pass">
        <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
            placeholder="Please Input PassWord" clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
            placeholder="Please Confirm UsrName" clearable
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
        >Submit
        </el-button
        >
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: 'HomeSignUp',
  data() {
    const checkUsrName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the usrName'))
      }
      setTimeout(() => {
        if (Number.isInteger(value)) {
          callback(new Error('Please input string'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        usrName: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        usrName: [{validator: checkUsrName, trigger: 'blur'}],
        pass: [{validator: validatePass, trigger: 'blur'}],
        checkPass: [{validator: validatePass2, trigger: 'blur'}],
      },
    }
  },
  methods: {
    //点击submit
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //form先转json字符串再转json对象
          let formNameStr = JSON.parse(JSON.stringify(this.$refs[formName]))['model']
          this.signUpUsr(formNameStr)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    //注册用户
    signUpUsr(formNameStr) {
      axios.post('/WebServer/home/usrInfo/signUpUsr', {usrName: formNameStr['usrName'], passWord: formNameStr['pass']},
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
          .then((response) => {
            console.log(response);
            if (401 === response['code']) {
              console.log(response);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  },
}
</script>

<style>
</style>