# Model change, 30 Jun 2026

<!--
cd ~/code/aipipe/
dev.sh -- codex --yolo --model gpt-5.5 --config model_reasoning_effort=medium
-->

The model requested may not be the model in the response.

For example `transform` validates `gpt-5.4-nano` but `cost` later receives `gpt-5.4-nano-2026-03-17` from the API response, the cost defaults to zero and the user gets the API call for free.

Write the MINIMAL, most elegantly robust change to default to the requested model's cost if the model returned is unknown.

Consider multiple approaches before deciding on the best one. A developer should take one look at it and instantly understand what it does and why - and it should ideally be no more than a few lines of changes.

---

Is there any possibility of needing the `[0, 0, 0, 0]` fallback?
In any case, set the cost to the pricing of an expensive frontier model, rather than zero.

<!-- codex resume 019f17a5-9ddf-76f2-8ab5-9171440e798e --yolo -->
