class PromiseM {
  state: string
  value: any
  reason: any
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    // 失败的原因
    this.reason = undefined
    // 成功
    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
      }
      this.value = value

    };
    // 失败
    let reject = (value) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
      }
      this.reason = value
    };
    try{
      executor(resolve, reject)
    }catch(err){
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    } else {
      onRejected(this.reason)
    }
  }
}
