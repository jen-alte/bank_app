  
/* eslint-disable */
<template>
	<v-app>
		<v-main class="dogs-layout">
			<v-container fill-height>
				<div class="dogs-overlay">
					<h1 class="display-2 text-xs-center">Choose your favorite cats</h1>
					<v-card class="dog-card">
            <v-layout row wrap>
						<v-img class="v-img" max-height="500px" max-width="500px" :src="currentDogLink"></v-img>
            <v-img class="v-img" max-height="500px" max-width="500px" :src="newDogLink"></v-img>
            </v-layout>
						<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn icon @click="addToFavorites" :disabled="isAlreadyInFavorites">
						<v-icon>favorite</v-icon>
						</v-btn>
						<v-btn icon @click="loadNewDog">
								<v-icon>forward</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
          <v-container grid-list-md fluid>
            <v-layout row wrap>
              <v-flex xs6 sm4 md2 v-for="(pet, index) in favoriteDogs" :key="pet">
                <v-card class="dog-card">
                  <v-img max-height="75px" max-width="150px" :src="pet"></v-img>
                   <v-img max-height="75px" max-width="150px" :src="pet"></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="removeFromFavorites(index)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
				</div>
			</v-container>
		</v-main>
	</v-app>
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      currentDogLink: "",
      newDogLink: "",
      favoriteDogs: []
    };
  },
  computed: {
    isAlreadyInFavorites() {
      return this.favoriteDogs.indexOf(this.currentDogLink) > -1;
    }
  },
  created() {
    this.loadNewDog();
  },
  methods: {
    loadNewDog() {
      axios
        .get('https://thatcopy.pw/catapi/rest/')
        .then((response) => {
          console.log(response)
          this.currentDogLink = response.data.url;
        })
        axios
        .get('https://dog.ceo/api/breeds/list/all')
        .then((response) => {
          console.log(response)
          this.currentDogLink = response.data.message;})
        .catch((error) => {
          console.log(error);
        });
    },
    addToFavorites() {
      this.favoriteDogs.push(this.currentDogLink);
    },
    removeFromFavorites(index) {
      this.favoriteDogs.splice(index, 1);
    }
  }
};
</script>


<style>
img {
  max-width: 100%;
}
h1 {
  padding-bottom: 15px;
}
.dogs-layout {
  width: 100%;
  background: rgb(3, 202, 216) center repeat;
}
.dogs-overlay {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: space-around;
}
@media (max-width: 768px) {
  .dogs-overlay {
    margin: 0;
  }
}
.dog-card {
  width: 100%;
  max-width: 600px;
}

.v-img {
  padding: 20px;
  margin: 20px;
}
</style>