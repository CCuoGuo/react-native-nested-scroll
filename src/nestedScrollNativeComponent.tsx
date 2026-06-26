/**
 * MIT License
 *
 * Copyright (C) 2026 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import {
    HostComponent,
    ViewProps,
} from "react-native";

import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent"
import { Int32, DirectEventHandler, WithDefault } from "react-native/Libraries/Types/CodegenTypes";

export type NestedScrollEvent = Readonly<{
    ContentInset: {
        left: Int32;
        top: Int32;
        bottom: Int32;
        right: Int32;
    };
    ContentOffset: {
        x: Int32;
        y: Int32;
    };
    ContentSize: {
        height: Int32;
        width: Int32;
    };
    LayoutMeasurement: {
        height: Int32;
        width: Int32;
    };
    lTargetContentOffset: {
        x: Int32;
        y: Int32;
    };
    zoomScale: Int32;
}>

export interface NestScrollProps extends ViewProps {
    bounces?: WithDefault<boolean, false>;
    onScroll?: DirectEventHandler<NestedScrollEvent>;
}

export default codegenNativeComponent<NestScrollProps>("RNCNestedScrollView") as HostComponent<NestScrollProps>; 
