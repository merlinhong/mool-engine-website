export function useEffect(callback: () => void, dependencies: any[]) {
  if (dependencies.length === 0) {
  } else {
    // 监视依赖变化
    watch(
      () => dependencies,
      (newDeps, oldDeps) => {
        // 如果依赖变化，调用回调
        if (JSON.stringify(newDeps) !== JSON.stringify(oldDeps)) {
          callback();
        }
      },
    );
  }

// 如果没有依赖，则只在组件挂载时执行一次
  onMounted(() => {
    callback();
  });

  // 在组件卸载时清理
  onUnmounted(() => {
    // 这里可以执行清理逻辑
  });
}
