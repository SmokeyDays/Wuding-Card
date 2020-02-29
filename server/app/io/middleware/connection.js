// 'use strict';

// module.exports = () => {
//   return async (ctx, next) => {
//     await next();

//     try {
//       const user = await ctx.model.User
//         .findOneAndUpdate(
//           { socketId: ctx.socket.id },
//           { $pull: { socketClientIds: ctx.socket.id } },
//           { new: true });
//     } catch (e) {
//       console.log(e);
//     }
//   };
// };
