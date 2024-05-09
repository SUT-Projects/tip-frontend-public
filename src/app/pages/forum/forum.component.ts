import { Component } from '@angular/core';
import forum_posts from './sample_forum_data.json';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent {
  posts: any = forum_posts;
  comments: any = [];
  open_create_post_interface: boolean = false;

  constructor () {
  }

  ngOnInit() {
    this.posts.forEach(post => {
      this.comments.push(...post.comments);
    });

    this.comments.forEach(comment => {
      comment.liked = false;
    })
  }


  like_unlike (comment) {
    if (!comment.liked) {
      comment.likes = comment.likes + 1;
    } else {
      comment.likes = comment.likes - 1;
    }
    comment.liked = !comment.liked;
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  create_comment(commentForm, post) {
    const content = commentForm.value.content;
    console.log(content);
    const dateNow: any = new Date();

    const newComment = {
      author: {
        name: "Me" // this should be the current user's name... - STEVEN
      },
      content: content,
      created_at: this.formatDate(dateNow),
      likes: 0
    }
    post.comments.push(newComment)
  }

  create_post (postForm) {
    const dateNow: any = new Date();

    const title = postForm.value.title;
    const content = postForm.value.content;
    const created_at = this.formatDate(dateNow);
    // const user = current user logged on
    const author_name = "Me";

    const newPost = {
      title: title,
      content: content,
      created_at: created_at,
      author: {
        name: author_name
      },
      comments: [{
        created_at: {},
        author: {
          name: {}
        }
      }]
    };

    this.posts.push(newPost);
    console.log(this.posts);

    this.open_create_post_interface = !this.open_create_post_interface;

  }
  /*create_post (postForm) {
    
    const title = userForm.value.name;
    const email = userForm.value.email;
    const password = userForm.value.password;
    const student_id = userForm.value.student_id;
    const userType = userForm.value.role;

    const newUser = {
      user_type: userType,
      name: name,
      email: email,
      password: password,
      student_id: student_id
    };

    this.all_user.push(newUser);
    this.all_user.forEach(user => {
      user.showPassword = false;
    });

    console.log(this.all_user);

    userForm.resetForm();
  }*/

}
