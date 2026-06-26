> Template Version: v0.3.0

<p align="center">
  <h1 align="center"> <code>react-native-nested-scroll</code> </h1>
</p>

This project is developed based on [react-native-nested-scroll@0.14.0](https://github.com/sdcxtech/react-native-troika/tree/master/packages/nested-scroll).

## 1. Installation and Usage

Please go to the Releases release address of the third-party library to view the supporting version information: [@react-native-oh-tpl/react-native-nested-scroll Releases](https://github.com/react-native-oh-library/react-native-nested-scroll/releases). For older versions that are not published to npm, install the tgz package by referring to the [Installation Guide](https://gitcode.com/CPF-RN/usage-docs/blob/master/zh-cn/tgz-usage.md).

Navigate to your project directory and enter the following command:

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

The following code demonstrates the basic usage of this library:

> [!WARNING]
> The import name of the library remains the same when used.

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

This section provides guidance for manually linking native dependencies.

First, you need to open the HarmonyOS project `harmony` in your project with DevEco Studio.

### 2.1 Overrides RN SDK

To ensure the project depends on the same version of the RN SDK, you need to add an `overrides` field in the `harmony/oh-package.json5` file at the project's root directory. This field should point to the RN SDK version required by the project. The version can be a specific version number, a fuzzy version, a local HAR package, or a source code directory.

For more information about this field, please refer to the [official documentation](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ide-oh-package-json5-V5#zh-cn_topic_0000001792256137_overrides).

```json
{
  "overrides": {
    "@rnoh/react-native-openharmony": "^0.72.38"
  }
}
```

### 2.2 Importing Native Code

There are currently two methods:

- By importing HAR packages;
- By directly linking the source code.

Method 1: Importing via HAR package (Recommended)

> [!TIP]
> The HAR package is located in the `harmony` folder of the third-party library's installation path.

Open `entry/oh-package.json5` and add the following dependency:

```json
"dependencies": {
    "@react-native-oh-tpl/react-native-nested-scroll": "file:../../node_modules/@react-native-oh-tpl/react-native-nested-scroll/harmony/nested_scroll.har"
  }
```

Click the `sync` button in the top right corner.

Or execute in the terminal:

```bash
cd entry
ohpm install
```

Method 2: Directly linking the source code

> [!TIP]
> To link the source code directly, please refer to the [instructions for linking source code directly](./link-source-code.md).

### 2.3 Configure CMakeLists and Import NestedScrollViewPackage

Open `entry/src/main/cpp/CMakeLists.txt` and add the following:

```diff
+ set(OH_MODULES "${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")

# RNOH_BEGIN: manual_package_linking_1
+ add_subdirectory("${OH_MODULES}/@react-native-oh-tpl/react-native-nested-scroll/src/main/cpp" ./nested-scroll)
# RNOH_END: manual_package_linking_1

# RNOH_BEGIN: manual_package_linking_2
+ target_link_libraries(rnoh_app PUBLIC rnoh_nested_scroll)
# RNOH_END: manual_package_linking_2
```

Open `entry/src/main/cpp/PackageProvider.cpp` and add the following:

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

### 2.4 Run

Click the `sync` button in the top right corner.

Or execute in the terminal:

```bash
cd entry
ohpm install
```

Then, build and run the project.

## 3. Constraints and Limitations

### 3.1 Compatibility

Please go to the Releases page of the third-party library to check the version information for compatibility: [@react-native-ohos/react-native-nested-scroll Releases](https://gitee.com/openharmony-sig/rntpc_react-native-nested-scroll/releases)

## 4. Props

> [!TIP]
> The "Platform" column indicates the platforms on which these props are supported in the original third-party library.

> [!TIP]
> If the value in the "HarmonyOS Support" column is "yes," it means the prop is supported on the HarmonyOS platform; "no" means it is not supported; "partially" means that some of its features are supported. The usage of this prop is the same on different platforms, and its effect is consistent with that on iOS or Android.

| Name                   | Description                                                                                       | Type    | Required | Platform | HarmonyOS Support |
| ---------------------- | ------------------------------------------------------------------------------------------------- | ------- | -------- | -------- | ----------------- |
| stickyHeight           | The area of the header height will be pinned to the top.                                          | number  | NO       | All      | yes               |
| stickyHeaderBeginIndex | It means that starting with the first few subcomponents, the subassemblies will be pinned to the top. | number  | NO       | All      | yes               |
| bounce                 | Elastic effect.                                                                                   | boolean | NO       | All      | yes               |
| onScroll               | Component callbacks.                                                                              | number  | NO       | All      | yes               |

## 5. Known Issues

None

## 6. Open Source License

This project is based on [The MIT License (MIT)](https://github.com/sdcxtech/react-native-troika/blob/master/packages/nested-scroll/LICENSE), feel free to enjoy and participate in open source.