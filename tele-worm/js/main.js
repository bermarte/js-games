window.addEventListener("load", () => {
  const c = document.getElementById("my_canvas");
  const ctx = c.getContext("2d");

  //single unit
  const box = 22;
  //stage width
  const width_box = 16;

  c.width = box * width_box;
  c.height = c.width;

  let center = c.width / 2;

  //scoren lifes, direction
  let score = 0;
  let lifes = 20;
  let dir;

  let worm = [];
  worm[0] = {
    x: center,
    y: center
  };

  function rand() {
    return Math.floor(Math.random() * width_box) * box;
  }

  let point = {
    x: rand(),
    y: rand()
  };

  //squares: 0,22,44,66,88,110,132,154,176,198,220,242,264,286,308,330,352
  let maze = [
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  document.addEventListener("keydown", direction);

  function direction(e) {
    if (e.keyCode == 37 && dir != "right") {
      console.log("left");
      dir = "left";
    } else if (e.keyCode == 38 && dir != "down") {
      console.log("up");
      dir = "up";
    } else if (e.keyCode == 39 && dir != "left") {
      console.log("right");
      dir = "right";
    } else if (e.keyCode == 40 && dir != "up") {
      console.log("down");
      dir = "down";
    }
  }

  function draw() {
    ctx.fillStyle = "#9b5517";
    ctx.fillRect(0, 0, c.width, c.height);
    //worm
    for (let i = 0; i < worm.length; i++) {
      if (!i == 0) {
        ctx.fillStyle = "#EB8F7F";
      } else {
        ctx.fillStyle = "#C87A32";
      }
      //shape
      //box: ctx.fillRect(worm[i].x, worm[i].y, box, box);
      ctx.beginPath();
      ctx.arc(worm[i].x, worm[i].y, box / 2, 0, 2 * Math.PI);
      ctx.fill();
    }

    //old pos of worm
    let worm_x = worm[0].x,
      worm_y = worm[0].y;

    //target
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(point.x, point.y, box / 2, 0, 2 * Math.PI);
    ctx.fill();

    //maze thing
    for (m = 0; m < maze.length; m++) {
      for (mr = 0; mr < maze[m].length; mr++) {
        //console.log("m table " + m + "m rij" + mr);
        if (maze[m][mr] === 1) {
          ctx.fillStyle = "green";
          ctx.fillRect(mr * box, m * box, box, box);
        }
      }
    }

    //collisions
    let maze_blocks_pos = [
      [0, 0],
      [22, 0],
      [44, 0],
      [308, 0],
      [330, 0],
      [352, 0],
      [0, 22],
      [22, 22],
      [44, 22],
      [308, 22],
      [330, 22],
      [352, 22],

      [0, 88],
      [22, 88],
      [44, 88],
      [308, 88],
      [330, 88],
      [352, 88],
      [0, 110],
      [22, 110],
      [44, 110],
      [308, 110],
      [330, 110],
      [352, 110],

      [0, 176],
      [22, 176],
      [44, 176],
      [308, 176],
      [330, 176],
      [352, 176],
      [0, 198],
      [22, 198],
      [44, 198],
      [308, 198],
      [330, 198],
      [352, 198],

      [0, 264],
      [22, 264],
      [44, 264],
      [308, 264],
      [330, 264],
      [352, 264],
      [0, 286],
      [22, 286],
      [44, 286],
      [308, 286],
      [330, 286],
      [352, 286],

      //vertical obstacles
      [110, 44],
      [132, 44],
      [220, 44],
      [242, 44],

      [110, 66],
      [132, 66],
      [220, 66],
      [242, 66],

      [110, 88],
      [132, 88],
      [220, 88],
      [242, 88],
      //154,176,198
      [110, 154],
      [132, 154],
      [220, 154],
      [242, 154],

      [110, 176],
      [132, 176],
      [220, 176],
      [242, 176],

      [110, 198],
      [132, 198],
      [220, 198],
      [242, 198],

      //264,286,308
      [110, 264],
      [132, 264],
      [220, 264],
      [242, 264],

      [110, 286],
      [132, 286],
      [220, 286],
      [242, 286],

      [110, 308],
      [132, 308],
      [220, 308],
      [242, 308]
    ];
    //where is the worm
    where(worm_x, worm_y);

    //check collisions
    function isArrayInArray(arr, item) {
      let item_as_string = JSON.stringify(item);

      let contains = arr.some(function(ele) {
        return JSON.stringify(ele) === item_as_string;
      });
      return !contains;
    }

    function canMove(x, y) {
      let xy_pos = [x, y];
      return isArrayInArray(maze_blocks_pos, xy_pos);
    }

    //where is the worm
    function where(x, y) {
      let xy_pos = [x, y];
      console.log(xy_pos);
      console.log("collision: " + isArrayInArray(maze_blocks_pos, xy_pos));
    }

    //check direction
    if (canMove(worm_x, worm_y)) {
      if (dir == "left") {
        //console.log("moving to the left");

        worm_x -= box;
      }
      if (dir == "right") {
        //console.log("moving to the right");

        worm_x += box;
      }
      if (dir == "up") {
        //console.log("moving up");

        worm_y -= box;
      }
      if (dir == "down") {
        //console.log("moving down");
        worm_y += box;
      }
    }

    //eat target
    if (worm_x == point.x && worm_y == point.y) {
      score++;
      //alert("point!");
      //move target
      point = {
        x: rand(),
        y: rand()
      };
    } else {
      //pop
      worm.splice(worm.length - 1, 1);
    }

    //stop walls
    //left wall
    if (worm_x <= 0) {
      worm_x = 0; //box / 2;
    }
    //right wall
    if (worm_x >= c.width) {
      worm_x = c.width; //c.width - box / 2;
    }
    //top wall
    if (worm_y >= c.height) {
      worm_y = c.height; //c.height - box / 2;
    }
    if (worm_y <= 0) {
      worm_y = 0; //box / 2;
    }

    if (!canMove(worm_x, worm_y)) {
      worm_y = center;
      worm_x = center;
      lifes--;
    }

    //add block
    let new_block = { x: worm_x, y: worm_y };
    worm.unshift(new_block);
    //worm[0] = new_block;

    //score
    ctx.fillStyle = "black";
    ctx.font = "32px Arial";
    ctx.fillText("score = " + score, 0, box);

    //lifes:
    ctx.fillText("lifes = " + lifes, 0, c.height);
    if (lifes == 0) {
      alert("GAME OVER, RESTART");

      score = 0;
      lifes = 20;
      worm_y = center;
      worm_x = center;

      /*
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillText("GAME OVER", 200, 200);
      */
    }
  }

  let game = setInterval(draw, 100);
});
