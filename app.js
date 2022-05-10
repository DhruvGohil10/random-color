let card = document.querySelector(".color");
let hexText = document.querySelector(".hex");
let copyBtn = document.querySelector(".copy-btn");
let copiedessage = document.querySelector(".copied-message");
let btn = document.querySelector(".color-btn");

// change random color
btn.addEventListener("click", () => {
	let color = randomColor();
	card.style.backgroundColor = color;
	hexText.innerText = color;
});

// copy hex to clipboard
copyBtn.addEventListener("click", () => {
	navigator.clipboard
		.writeText(hexText.innerText)
		.then(() => {
			// console.log("hex copied 👍");
			copiedessage.style.display = "block";
			setTimeout(() => copiedessage.style.display = "none", 2100);
		})
		.catch((err) => {
			console.log("Something went wrong", err);
		});
});

// particles
window.demoDescription =
	"Particles colliding with each other in space. Move the pointer to hit them like billiard balls.";

Pts.quickStart("#pt", "#123");

(function () {
	var world;

	space.add({
		start: (bound, space) => {
			// Create world and 100 random points
			world = new World(space.innerBound, 1, 0);
			let pts = Create.distributeRandom(space.innerBound, 60);

			// Create particles and hit them with a random impulse
			for (let i = 0, len = pts.length; i < len; i++) {
				let p = new Particle(pts[i]).size(
					i === 0 ? 30 : 3 + (Math.random() * space.size.x) / 50
				);
				p.hit(Num.randomRange(-50, 50), Num.randomRange(-25, 25));
				world.add(p);
			}

			world.particle(0).lock = true; // lock it to move it by pointer later on
		},

		animate: (time, ftime) => {
			world.drawParticles((p, i) => {
				let color =
					i === 0
						? "#fff"
						: ["#ff3571", "#48ffd3", "#6356ff", "#fff968"][i % 4];
						// : ["#ff2d5d", "#42dc8e", "#2e43eb", "#ffe359"][i % 4];
				form.fillOnly(color).point(p, p.radius, "circle");
			});

			world.update(ftime);
		},

		action: (type, px, py) => {
			if (type == "move") {
				world.particle(0).position = new Pt(px, py);
			}
		},

		resize: (bound, evt) => {
			if (world) world.bound = space.innerBound;
		},
	});

	space.bindMouse().bindTouch();
	space.play();
})();
