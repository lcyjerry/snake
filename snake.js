var map = document.getElementById("map");
      var all = document.getElementsByClassName("snake");

      function Snake() {
        this.width = 10;
        this.height = 10;
        this.direction = "right";

        this.body = [
          { x: 2, y: 0 },
          { x: 1, y: 0 },
          { x: 0, y: 0 },
        ];

        this.create = function () {
          for (var i = 0; i < this.body.length; i++) {
            var s = document.createElement("div");
            s.className = "snake";
            s.style.background = "black";
            s.style.left = this.width * this.body[i].x + "px";
            map.appendChild(s);
          }
        };

        this.move = function () {
          var x = this.body[this.body.length - 1].x;
          var y = this.body[this.body.length - 1].y;
          // 后一个元素等于前一个元素的
          for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
          }
          // 根据方向处理蛇头
          switch (this.direction) {
            case "up":
              this.body[0].y -= 1;
              break;

            case "down":
              this.body[0].y += 1;
              break;

            case "left":
              this.body[0].x -= 1;
              break;

            case "right":
              this.body[0].x += 1;
              break;
          }

          // 自身移动
          for (var i = 0; i < this.body.length; i++) {
            all[i].style.left = this.body[i].x * this.width + "px";
            all[i].style.top = this.body[i].y * this.height + "px";
          }

          // 判断是否出界
          if (
            this.body[0].x < 0 ||
            this.body[0].x > 79 ||
            this.body[0].y < 0 ||
            this.body[0].y > 39
          ) {
            clearInterval(timer);
            alert("很遗憾你出界了");
            this.body = [
              { x: 2, y: 0 },
              { x: 1, y: 0 },
              { x: 0, y: 0 },
            ];
            map.innerHTML = "";
            this.direction = "right";
            this.create();
            food.create();
            return false;
          }
          // 判断是否吃到食物
          if (this.body[0].x == food.x && this.body[0].y == food.y) {
            map.removeChild(food.flag);
            food.create();
            var s = document.createElement("div");
            s.style.width = 10 + "px";
            s.style.height = 10 + "px";
            s.style.position = "absolute";
            s.style.background = "black";
            s.style.left = x * this.width + "px";
            s.style.top = y * this.height + "px";
            s.className = "snake";
            this.body.push({ x: null, y: null });
            map.appendChild(s);
          }

          // 判断是否碰到自己 四个以上才会发生
          for (var i = 4; i < this.body.length; i++) {
            if (
              this.body[0].x == this.body[i].x &&
              this.body[0].y == this.body[i].y
            ) {
              clearInterval(timer);
              alert("你碰到自己了");
              this.body = [
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 0 },
              ];
              map.innerHTML = "";
              this.create();
              food.create();
              this.direction = "right";
              return false;
            }
          }
        };
      }

      function Food() {
        this.width = 10;
        this.height = 10;

        this.create = function () {
          var f = document.createElement("div");
          this.flag = f;
          f.style.width = this.width + "px";
          f.style.height = this.height + "px";
          f.style.borderRadius = "50%";
          f.style.backgroundColor = "red";
          f.style.position = "absolute";
          this.x = Math.floor(Math.random() * 80);
          this.y = Math.floor(Math.random() * 40);
          f.style.left = this.x * this.width + "px";
          f.style.top = this.y * this.height + "px";
          map.appendChild(f);
        };
      }

      document.body.onkeydown = function (e) {
        var ev = e || window.event;

        switch (ev.keyCode) {
          case 38:
            if (snake.direction != "down") snake.direction = "up";
            break;

          case 40:
            if (snake.direction != "up") snake.direction = "down";
            break;

          case 37:
            if (snake.direction != "right") snake.direction = "left";
            break;

          case 39:
            if (snake.direction != "left") snake.direction = "right";
            break;
        }
      };

      var snake = new Snake();
      var food = new Food();
      var timer;
      snake.create();
      food.create();
      btn.onclick = function () {
        clearInterval(timer);
        timer = setInterval(function () {
          snake.move();
        }, 50);
      };