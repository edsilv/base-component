const { TinyEmitter } = require('tiny-emitter');

namespace _Components {
    export class BaseComponent implements IBaseComponent {

        public options: IBaseComponentOptions;
        protected _$element: JQuery;

        constructor(options: IBaseComponentOptions){
            this.options = $.extend(this._getDefaultOptions(), options);
        }

        protected _init(): boolean{
            this._$element = $(this.options.element);

            if (!this._$element.length){
                console.warn('element not found');
                return false;
            }

            this._$element.empty();

            return true;
        }

        protected _getDefaultOptions(): IBaseComponentOptions {
            return <IBaseComponentOptions>{};
        }

        protected _emit(event: string, ...args: any[]): void {
            TinyEmitter.emit(event, args);
        }

        protected _resize(): void {

        }

        // todo: should the data param be removed? encourages using the options object instead
        public databind(data?: any): void {

        }
    }

    // use: applyMixins(BaseComponent, [myMixin]);
    export function applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }

}

(function(g) {
    if (!g._Components){
        g._Components = _Components;
    }
})(global);
