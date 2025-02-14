interface Document {
    /**
     * 表示当前文档是否正在预渲染上下文中加载
     * https://developer.mozilla.org/en-US/docs/Web/API/Document/prerendering
     */
    readonly prerendering: boolean;
}

interface Window {
}

interface Navigator {
    connection: {
        effectiveType: string;
    };
}