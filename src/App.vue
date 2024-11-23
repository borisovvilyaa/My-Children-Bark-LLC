<template>
	<div>
		<transition name="fade">
			<div v-if="isLoading" class="preloader">
				<div class="ajax-loader">
					<div class="paw">
						<svg class="icon"><use href="#paw" /></svg>
					</div>
					<div class="paw">
						<svg class="icon"><use href="#paw" /></svg>
					</div>
					<div class="paw">
						<svg class="icon"><use href="#paw" /></svg>
					</div>
					<div class="paw">
						<svg class="icon"><use href="#paw" /></svg>
					</div>
					<div class="paw">
						<svg class="icon"><use href="#paw" /></svg>
					</div>
					<div class="paw">
						<svg class="icon"><use href="#paw" /></svg>
					</div>
				</div>
			</div>
		</transition>

		<Header v-if="!isLoading"></Header>
		<router-view v-if="!isLoading" />
		<Footer v-if="!isLoading"></Footer>
	</div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
	components: {
		Header,
		Footer,
	},
	data() {
		return {
			isLoading: true,
		}
	},
	mounted() {
		setTimeout(() => {
			this.isLoading = false
		}, 2000) // Adjusted loading time
	},
}
</script>

<style>
.paw-icon {
	width: 35px;
	height: 35px;
	margin-bottom: 15px;
}
/* Preloader container */
.preloader {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #fffbf4; /* Light background */
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
}

/* Loader with paw prints */
.ajax-loader {
	position: absolute;
	top: 50%; /* Center vertically */
	left: 50%; /* Center horizontally */
	transform: translate(-50%, -50%); /* Exactly center */
	font-size: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.paw {
	width: 2em; /* Increased size of paws */
	height: 2em; /* Increased size of paws */
	animation: 2050ms pawAnimation ease-in-out infinite;
	opacity: 0;
	margin: 0 0.2em; /* Adjust spacing between paws */

	svg {
		width: 100%;
		height: 100%;
	}

	.icon {
		fill: #bb8b5a; /* Set color of paws to #bb8b5a */
		transform: rotate(90deg); /* Поворот иконки на 90 градусов */
	}

	/* Positioning paws */
	&:nth-child(odd) {
		transform: rotate(-10deg) translate(50%, 0); /* Adjust movement for odd paws */
	}

	&:nth-child(even) {
		transform: rotate(10deg) translate(50%, 0); /* Adjust movement for even paws */
	}

	/* Animation delay for each paw */
	&:nth-child(1) {
		animation-delay: 0s;
	}
	&:nth-child(2) {
		animation-delay: 0.25s;
	}
	&:nth-child(3) {
		animation-delay: 0.5s;
	}
	&:nth-child(4) {
		animation-delay: 0.75s;
	}
	&:nth-child(5) {
		animation-delay: 1s;
	}
	&:nth-child(6) {
		animation-delay: 1.25s;
	}

	/* Fallback for browsers with no CSS animations */
	.no-cssanimations & {
		opacity: 1;
	}
}

/* Keyframe animation for paw print fade effect */
@keyframes pawAnimation {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
}

/* Media queries for responsive design */
@media (max-width: 768px) {
	.ajax-loader {
		font-size: 40px; /* Decrease the font size for tablets */
	}

	.paw {
		width: 1.5em; /* Decrease paw size */
		height: 1.5em; /* Decrease paw size */
	}

	.ajax-loader {
		top: 50%; /* Center vertically */
		left: 50%; /* Center horizontally */
		transform: translate(-50%, -50%);
	}
}

@media (max-width: 480px) {
	.ajax-loader {
		font-size: 30px; /* Further decrease the font size for mobile */
	}

	.paw {
		width: 1.2em; /* Further decrease paw size */
		height: 1.2em; /* Further decrease paw size */
	}
}
</style>
