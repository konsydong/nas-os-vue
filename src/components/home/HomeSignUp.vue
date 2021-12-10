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
      <el-form-item label="Password" prop="pass">
        <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="Age" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
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
  <div>
    <button @click="getUserInfo">getUserInfo1</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HomeSignUp',
  data() {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the age'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'))
        } else {
          if (value < 18) {
            callback(new Error('Age must be greater than 18'))
          } else {
            callback()
          }
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
        pass: '',
        checkPass: '',
        age: '',
      },
      rules: {
        pass: [{validator: validatePass, trigger: 'blur'}],
        checkPass: [{validator: validatePass2, trigger: 'blur'}],
        age: [{validator: checkAge, trigger: 'blur'}],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getUserInfo() {
      axios.get('/WebServer/home/get-user-info?id=1', null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
          .then((response) => {
            console.log(response);
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