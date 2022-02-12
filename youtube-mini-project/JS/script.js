const signup = () => {
    window.location.href = "signup.html";
  };
  async function signin() {
    let signindata = {
      password: form.password.value,
      username: form.username.value,
    };
    signindata = JSON.stringify(signindata);
    // console.log("signupdata:", signindata);

    let link = "https://masai-api-mocker.herokuapp.com/auth/login";

    let res = await fetch(link, {
      method: "POST",
      body: signindata,
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();
    console.log("data:", data);

    let username = document.getElementById("username").value;
    getprofile(username, data.token);
  }

  //   let token = "18dbb51f03fd4cc31cb71c78d75d0825";
  async function getprofile(username, token) {
    let api = `https://masai-api-mocker.herokuapp.com/user/${username}`;

    let res = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await res.json();
    console.log("data:", data);
  }