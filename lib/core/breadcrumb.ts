import {BreadcrumbTypes} from "@/types/breadcrumbTypes";

/**
 * 用户行为操作记录
 */
export class Breadcrumb {

    // 最大行为栈长度
    private maxBreadcrumbLength: number = 50;

    //  行为栈
    private breadcrumb: BreadcrumbTypes[] = [];

    /**
     * 添加行为操作记录
     * @param {BreadcrumbTypes} data
     */
    add(data: BreadcrumbTypes) {
        if (this.breadcrumb.length > this.maxBreadcrumbLength) {
            this.breadcrumb.shift();
        }

        this.breadcrumb.push(data)

        return this.getBreadcrumbs();
    }

    // 获取行为栈
    getBreadcrumbs() {
        return [...this.breadcrumb];
    }


    // 情况行为
    clear() {
        this.breadcrumb = []
    }
}
