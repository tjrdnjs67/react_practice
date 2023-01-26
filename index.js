const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");
const port = 5000;

//application/x-www-form-urlencoded으로 데이터를 분석해서 가져올 수 있도록 해주는 것
app.use(bodyParser.urlencoded({ extended: true }));
//application/json으로 되어있는 데이터를 분석해서 가져올 수 있도록 해주는 것
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World!~~안녕하세요~"));

app.post("/register", (req, res) => {
  //회원 가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);
  //user model에 저장
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
