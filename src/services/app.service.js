import { Component } from 'react';
import * as apiService from './apiservice';


export class AppService extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 
     * 
     * Users Section
     * 
     * 
     * 
     */

    /**
     * This method returns all
     */
    async getConversationTree() {
        return await apiService.get('trees');
    }


    /**
 * 
 * 
 * Categories Section
 * 
 * 
 * 
 */

    /**
     * This method returns all categories
     */
    async getAllCategories() {
        return await apiService.get('categories');
    }




    /**
     * 
     * 
     * Products Section
     * 
     * 
     * 
     */

    /**
     * This method returns all products
     */
    async getAllProducts() {
        return await apiService.get('products');
    }



}