"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = void 0;
const Products_1 = require("../Query/Products");
function searchProducts(nameProduct) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let productsSearched = [];
            if (!nameProduct) {
                return yield (0, Products_1.productsDB)();
            }
            else {
                let products = yield (0, Products_1.productsDB)();
                products.forEach((element) => {
                    if (element.name.includes(nameProduct.toUpperCase())) {
                        productsSearched.push(element);
                    }
                });
                return (productsSearched.length) ? productsSearched : { Error_message: "NOT_FOUND_PRODUCT" };
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.searchProducts = searchProducts;
