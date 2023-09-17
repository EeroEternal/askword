export default function Input() {
    const input_css = "flex flex-row py-2 bg-white gap-2 border rounded drop-shadow shadow-xs rounded-lg w-full";


    return (
        <div
            class="group w-full lg:pl-60 lg:mx-auto pt-2 border-t md:border-t-0 md:border-transparent md:bg-vert-light-gradient bg-white md:!bg-transparent"
        >
            <div
                class="h-18 flex flex-col text-base md:max-w-2xl lg:max-w-xl xl:max-w-3xl lg:px-0 mx-auto"
            >
                <div class={input_css}>
                    <textarea
                        bind:this={input_bind}
                        id="input_message_text"
                        rows="1"
                        class="flex w-full py-1 text-sm pl-4 resize-none overflow-y-auto focus:outline-none border-0 focus:ring-0"
                        placeholder={isMobile
                            ? $_("page.chat.mobile-message")
                            : $_("page.chat.send-message")}
                        tabindex="0"
                        on:keydown={async (e) => inputKeyDown(e)}
                        on:input={inputChange}
                    />
                    <!--send button-->
                    <div class="flex flex-col justify-between">
                        <div class="flex-1" />
                        <button
                            type="submit"
                            id="send-message-button"
                            class="flex text-sm rounded-md align-bottom pr-3 h-6"
                            on:click={async (e) => sendMessage(e)}
                            on:keydown={async (e) => sendMessage(e)}
                        >
                            <Send color={send_color} ready={chat_ready} />
                        </button>
                    </div>
                </div>

                <div class="flex justify-between pt-1 pb-2">
                    <div
                        class="flex flex-row text-xs text-teal-600 pl-1 transition-opacity"
                    >
                        {notify}
                    </div>
                    <div class="">
                        <div class="flex flex-row text-xs text-gray-400">
                            <p class="pr-2">
                                {$current_model}
                            </p>

                            {#if message_left !== 999999}
                            <div class="border-r border-gray-300 h-4" />

                            <p id="message-left" class="pl-2">
                                {$_("page.chat.message-left").replace(
                                    "{}",
                                    message_left
                                )}
                            </p>
                            {/if}

                                < div class="text-xs text-teal-500 pl-2">
                            <button
                                on:click={() => {
                                    showPay = true;
                                }}
                            >
                                {message_left === 0
                                    ? $_("page.chat.no-message-left")
                                    : ""}
                            </button>
                        </>
                    </div>
                </div>
            </div>
        </div>
{ #if showPay }
    <Pay
        on:update={() => {
            showPay = false;
        }}
    />
    {
        /if}
</div >
    );
    }
