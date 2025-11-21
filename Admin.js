import mongoose from 'mongoose';
import config from './config/config.js'; 
import User from './server/models/user.model.js'; 

console.log("🚀 开始配置管理员账号...");

mongoose.connect(config.mongoUri)
  .then(async () => {
    console.log("✅ 数据库连接成功");

    const email = 'admin@example.com';

    // 1. 先尝试查找是否已经存在这个用户
    const user = await User.findOne({ email: email });

    if (user) {
      // === 情况 A: 用户已存在，直接修改角色 ===
      console.log(`⚠️ 用户 ${email} 已存在，正在将其升级为 Admin...`);
      user.role = 'admin';
      // 如果你想重置密码，把下面这行注释取消掉
      // user.password = 'admin123'; 
      await user.save();
      console.log("✅ 成功！现有用户已升级为管理员权限。");
    } else {
      // === 情况 B: 用户不存在，创建新用户 ===
      console.log(`✨ 用户不存在，正在创建新的 Admin...`);
      const newAdmin = new User({
        name: 'Super Admin',
        email: email,
        password: 'admin123',
        role: 'admin'
      });
      await newAdmin.save();
      console.log("✅ 成功！全新的管理员账号已创建。");
    }
    
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ 操作失败:", err);
    process.exit(1);
  });

/*import mongoose from 'mongoose';
import config from './config/config.js';
import User from './server/models/user.model.js';

mongoose.connect(config.mongoUri)
  .then(async () => {


    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123', // 通过 virtual 设置密码
      role: 'admin'
    });
    await admin.save();
    console.log('Admin created');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
*/