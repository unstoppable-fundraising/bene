<script lang="ts">
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";

    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";

    let isTurning = false;
    let turnTimeout: ReturnType<typeof setTimeout> | null = null;

    function handleToggleClick() {
        toggleMode();
        isTurning = true;

        if (turnTimeout) {
            clearTimeout(turnTimeout);
        }

        turnTimeout = setTimeout(() => {
            isTurning = false;
            turnTimeout = null;
        }, 700);
    }
</script>

<div class="theme-toggle-motion" class:turning={isTurning}>
    <Button
        variant="outline"
        size="icon"
        class="rounded-full"
        on:click={handleToggleClick}
    >
        <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
    </Button>
</div>

<style>
    .theme-toggle-motion {
        display: inline-block;
        transform: rotate(0deg);
        transition: transform 700ms ease;
    }

    .theme-toggle-motion.turning {
        transform: rotate(180deg);
    }
</style>
