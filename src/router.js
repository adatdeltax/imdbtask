import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import MovieCreateComponent from './components/Movie/MovieCreateComponent';
import MovieListComponent from './components/Movie/MovieListComponent';
Vue.use(VueRouter);

const routes =[
    {path:'/',component:Home},
    {path:'/movies',component:MovieListComponent},
    {path:'/movies/create',component:MovieCreateComponent},
    {name:'movieedit',path:'/movies/edit/:id',component:MovieCreateComponent}
    

    
]


export default new VueRouter({mode:'history',routes});