export default class ArrangeActChain {

    setup(actList, context) {
        this._actList = actList;
        this._context = context;
    }

    get actList() {
        return this._actList;
    }

    get context() {
        return this._context;
    }

    async execute() {
        for (let act of this._actList) {
            await act(this._context);
        }
    }

    executeSync() {
        this._actList.forEach(act => {
            act(this._context);
        });
    }

}
