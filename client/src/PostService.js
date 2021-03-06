import axios from 'axios';

const url = 'api/posts/';

class PostService {
  // gets posts
  static getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            created_at: new Date(post.created_at)
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  // create post
  static insertPost(text) {
    return axios.post(url, {
      text
    });
  }

  // delete posts
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
