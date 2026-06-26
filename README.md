> 模板版本：v0.3.0

<p align="center">
  <h1 align="center"> <code>react-native-nested-scroll</code> </h1>
</p>

本项目基于 [react-native-nested-scroll@0.14.0](https://github.com/sdcxtech/react-native-troika/tree/master/packages/nested-scroll) 开发。

## 1. 安装与使用

请到三方库的 Releases 发布地址查看配套的版本信息：[@react-native-oh-tpl/react-native-nested-scroll Releases](https://github.com/react-native-oh-library/react-native-nested-scroll/releases) 。对于未发布到npm的旧版本，请参考[安装指南](https://gitcode.com/CPF-RN/usage-docs/blob/master/zh-cn/tgz-usage.md)安装tgz包。


进入到工程目录并输入以下命令：

<!-- tabs:start -->

#### **npm**

```bash
npm install @react-native-oh-tpl/react-native-nested-scroll
```

#### **yarn**

```bash
yarn add @react-native-oh-tpl/react-native-nested-scroll
```

<!-- tabs:end -->

下面的代码展示了这个库的基本使用场景：

> [!WARNING] 使用时 import 的库名不变。

```js
import {StyleSheet, View} from 'react-native';
import {NestedScrollView} from '@react-native-oh-tpl/react-native-nested-scroll';

import {FlatListPage} from './FlatListPage';
import {ParallaxHeader} from './ParallaxHeader';
import {useAnimateScrollView} from './hooks/useAnimatedScrollView';
import AnimatedNavbar from './AnimatedNavbar';
import {TopNavBar} from './components/TopNavBar';
import {HeaderNavBar} from './components/HeaderNavBar';
import {HeaderComponent} from './components/HeaderComponent';

// Within your render function
function NestedScrollParallaxHeader() {
    const imageHeight = 220;
    const [scroll, onScroll, scale, translateYDown, translateYUp] = useAnimateScrollView(
        imageHeight,
        false,
    );

    return (
      <View style={styles.fill}>
        <NestedScrollView bounces>
            <ParallaxHeader
                topBarHeight={180}
                imageHeight={180}
                imageSource={require('../assets/cover.webp')}
                scale={scale}
                translateYDown={translateYDown}
                translateYUp={translateYUp}>
                <HeaderComponent />
            </ParallaxHeader>
            <FlatListPage />
        </NestedScrollView>

        <AnimatedNavbar
            scroll={scroll}
            headerHeight={50}//topBarHeight()}
            statusBarHeight={80}//statusBarHeight()}
            imageHeight={imageHeight}
            OverflowHeaderComponent={<HeaderNavBar />}
            TopNavbarComponent={<TopNavBar />}
            /> 
      </View>
  );
}
export default NestedScrollParallaxHeader;
// Later on in your styles..
const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    image: {
        height: 160,
        width: '100%',
    },
});
```

## 2. Manual Link

此步骤为手动配置原生依赖项的指导。

首先需要使用 DevEco Studio 打开项目里的 HarmonyOS 工程 `harmony`。

### 2.1 Overrides RN SDK

为了让工程依赖同一个版本的 RN SDK，需要在工程根目录的 `harmony/oh-package.json5` 添加 overrides 字段，指向工程需要使用的 RN SDK 版本。替换的版本既可以是一个具体的版本号，也可以是一个模糊版本，还可以是本地存在的 HAR 包或源码目录。

关于该字段的作用请阅读[官方说明](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ide-oh-package-json5-V5#zh-cn_topic_0000001792256137_overrides)

```json
{
  "overrides": {
    "@rnoh/react-native-openharmony": "^0.72.38"
  }
}
```

### 2.2 引入原生端代码

目前有两种方法：

- 通过 har 包引入；
- 直接链接源码。

方法一：通过 har 包引入（推荐）

> [!TIP] har 包位于三方库安装路径的 `harmony` 文件夹下。

打开 `entry/oh-package.json5`，添加以下依赖

```json
"dependencies": {
    "@react-native-oh-tpl/react-native-nested-scroll": "file:../../node_modules/@react-native-oh-tpl/react-native-nested-scroll/harmony/nested_scroll.har"
  }
```

点击右上角的 `sync` 按钮

或者在终端执行：

```bash
cd entry
ohpm install
```

方法二：直接链接源码

> [!TIP] 如需使用直接链接源码，请参考[直接链接源码说明](./link-source-code.md)

### 2.3 配置 CMakeLists 和引入 NestedScrollViewPackage

打开 `entry/src/main/cpp/CMakeLists.txt`，添加：

```diff
+ set(OH_MODULES "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")

# RNOH_BEGIN: manual_package_linking_1
+ add_subdirectory("${OH_MODULES}/@react-native-oh-tpl/react-native-nested-scroll/src/main/cpp" ./nested-scroll)
# RNOH_END: manual_package_linking_1

# RNOH_BEGIN: manual_package_linking_2
+ target_link_libraries(rnoh_app PUBLIC rnoh_nested_scroll)
# RNOH_END: manual_package_linking_2
```

打开 `entry/src/main/cpp/PackageProvider.cpp`，添加：

```diff
#include "RNOH/PackageProvider.h"
#include "generated/RNOHGeneratedPackage.h"
+ #include "NestedScrollViewPackage.h"

using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
    return {
      std::make_shared<RNOHGeneratedPackage>(ctx),
+      std::make_shared<NestedScrollViewPackage>(ctx)
    };
}
```

### 2.4 运行

点击右上角的 `sync` 按钮

或者在终端执行：

```bash
cd entry
ohpm install
```

然后编译、运行即可。

## 3. 约束与限制

### 3.1 兼容性

请到三方库相应的 Releases 发布地址查看 Release 配套的版本信息：[@react-native-ohos/react-native-nested-scroll Releases](https://gitee.com/openharmony-sig/rntpc_react-native-nested-scroll/releases)

## 4. 属性

> [!TIP] "Platform" 列表示这些属性在原始第三方库中支持的平台。

> [!TIP] "如果“HarmonyOS 支持”列的值为“yes”，则表示 HarmonyOS 平台支持该属性；“no”则表示不支持；“partially”表示部分支持该属性的功能。该属性在不同平台上的使用方法相同，效果与 iOS 或 Android 平台一致。

| Name        | Description                                       | Type   | Required | Platform | HarmonyOS Support |
| ----------- | ------------------------------------------------- | ------ | -------- | -------- | ----------------- |
| stickyHeight| The area of the header height will be pinned to the top                                      | number | NO       | All      | yes               |
| stickyHeaderBeginIndex | It means that starting with the first few subcomponents, the subassemblies will be pinned to the top | number | NO       | All      | yes               |
| bounce    | Elastic effect                               | boolean | NO       | All      | yes               |
| onScroll    |component callbacks                             | number | NO       | All      | yes               |

## 5. 遗留问题
无

## 6. 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/sdcxtech/react-native-troika/blob/master/packages/nested-scroll/LICENSE)，请自由地享受和参与开源。
